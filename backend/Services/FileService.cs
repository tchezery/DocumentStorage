using System.IO;

using backend.Dtos;

namespace backend.Services;

public class FileService
{
    private readonly string _storageRoot = "Uploads";

    public List<FileNodeDto> GetFileTree(string code)
    {
        var basePath = Path.Combine(_storageRoot, code);

        if (!Directory.Exists(basePath))
        {
            throw new DirectoryNotFoundException("Pasta não identificada");
        }

        return ReadDirectory(basePath, basePath);
    }

    private List<FileNodeDto> ReadDirectory(string currentPath, string basePath)
    {
        var nodes = new List<FileNodeDto>();

        // Folder
        foreach (var dir in Directory.GetDirectories(currentPath))
        {
            var dirInfo = new DirectoryInfo(dir);

            nodes.Add(new FileNodeDto
            {
                Name = dirInfo.Name,
                Type = "folder",
                Date = dirInfo.LastWriteTimeUtc.ToString("o"),
                Path = Path.GetRelativePath(basePath, dir).Replace("\\", "/"),
                Children = ReadDirectory(dir, basePath)
            });
        }

        // Flies
        foreach (var file in Directory.GetFiles(currentPath))
        {
            var fileInfo = new FileInfo(file);

            nodes.Add(new FileNodeDto
            {
                Name = fileInfo.Name,
                Type = "file",
                Size = fileInfo.Length,
                Date = fileInfo.LastWriteTimeUtc.ToString("o"),
                Path = Path.GetRelativePath(basePath, file).Replace("\\", "/")
            });
        }

        return nodes;
    }
}