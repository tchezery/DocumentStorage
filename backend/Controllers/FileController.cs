using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Mvc;

using backend.Services;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    private readonly FileService _fileService;

    public FileController(FileService fileService)
    {
        _fileService = fileService;
    }

    [HttpGet("info/{code}")]
    public IActionResult GetFileInfo(string code)
    {
        try
        {
            var result = _fileService.GetFileTree(code);
            return Ok(result);
        }
        catch (DirectoryNotFoundException)
        {
            Console.WriteLine($"Código {code} não encontrado");
            return NotFound(new { message = "Código não encontrado." });
        }
    }
}