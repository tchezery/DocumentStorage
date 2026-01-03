using Microsoft.EntityFrameworkCore;

using backend.Data;
using backend.Models;

namespace backend.Services;

public class FileCleanUpService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<FileCleanUpService> _logger;

    public FileCleanUpService(IServiceProvider serviceProvider, ILogger<FileCleanUpService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Init Clean Service.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await DoCleanUpAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Tentativa de limpeza falhou.");
            }

            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }

    private async Task DoCleanUpAsync()
    {
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();


        var expireRoots = await context.FileNode
            .Where(n => n.ParentId == null && n.ExpiresAt < DateTime.UtcNow)
            .ToListAsync();

        if (!expireRoots.Any()) return;

        _logger.LogInformation($"Identify {expireRoots.Count} uploads expireds to exclusion.");

        foreach (var root in expireRoots)
        {
            var allNodesInTree = await GetAllDescendants(context, root.Id);
            allNodesInTree.Add(root);

            var blobIdsToDeleteCandidate = allNodesInTree
                .Where(n => n.BlobId != null)
                .Select(n => n.BlobId.Value)
                .Distinct()
                .ToList();

            context.FileNode.RemoveRange(allNodesInTree);
            await context.SaveChangesAsync();

            foreach (var blobId in blobIdsToDeleteCandidate)
            {
                bool isStillUsed = await context.FileNode.AnyAsync(n => n.BlobId == blobId);

                if (!isStillUsed)
                {
                    var blob = await context.FileBlob.FindAsync(blobId);
                    if (blob != null)
                    {
                        if (File.Exists(blob.StoragePath))
                        {
                            try
                            {
                                File.Delete(blob.StoragePath);
                                
                                var dir = Path.GetDirectoryName(blob.StoragePath);
                                if (Directory.GetFiles(dir!).Length == 0) Directory.Delete(dir!);
                            }
                            catch { }
                        }

                        context.FileBlob.Remove(blob);
                    }
                }
            }

            await context.SaveChangesAsync();
        }
    }

    private async Task<List<FileNode>> GetAllDescendants(AppDbContext context, int parentId)
    {
        var result = new List<FileNode>();
        var children = await context.FileNode.Where(n => n.ParentId == parentId).ToListAsync();

        foreach (var child in children)
        {
            result.Add(child);
            result.AddRange(await GetAllDescendants(context, child.Id));
        }

        return result;
    }
}