using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;

using backend.Data;
using backend.Models;
using System.Reflection.PortableExecutable;

[ApiController]
[Route("api/file")]
public class UploadController : ControllerBase
{
    private readonly AppDbContext _context;

    public UploadController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Arquivo não enviado!");
        }

        var mainFolder = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Uploads"
        );

        if (!Directory.Exists(mainFolder))
        {
            Directory.CreateDirectory(mainFolder);
        }

        var code = Guid.NewGuid().ToString("N")[..8].ToUpper();

        var fileFolder = Path.Combine(mainFolder, code);
        Directory.CreateDirectory(fileFolder);

        var originalName = Path.GetFileName(file.FileName);
        var fullPath = Path.Combine(fileFolder, originalName);

        using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var fileEntity = new backend.Models.Files
        {
            Code = code,
            FileName = file.FileName,
            FilePath = fullPath,
            Size = file.Length
        };

        _context.Files.Add(fileEntity);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            code = code
        });
    }

    [HttpGet("download/{code}")]
    public async Task<IActionResult> Download(string code)
    {
        var folderPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Uploads",
            code
        );

        if (!Directory.Exists(folderPath))
        {
            return NotFound("Pasta do arquivo não encontrada.");
        }

        // cria zip em memória
        using var memoryStream = new MemoryStream();

        using (var zip = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
        {
            var files = Directory.GetFiles(folderPath);

            foreach (var filePath in files)
            {
                var fileName = Path.GetFileName(filePath);
                var entry = zip.CreateEntry(fileName);

                using var entryStream = entry.Open();
                using var fileStream = System.IO.File.OpenRead(filePath);

                await fileStream.CopyToAsync(entryStream);
            }
        }

        memoryStream.Position = 0;

        return File(
            memoryStream.ToArray(),
            "application/zip",
            $"{code}.zip"
        );
    }
}
