using Microsoft.AspNetCore.Mvc;

using backend.Services;
using backend.Dtos;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    private readonly FileStorageService _fileStorageService;

    public FileController(FileStorageService fileStorageService)
    {
        _fileStorageService = fileStorageService;
    }

    [HttpGet("infoV2/{code}")]
    public async Task<IActionResult> GetFileInfo(string code)
    {
        var tree = await _fileStorageService.GetFileTreeAsync(code);

        if (tree == null)
        {
            return NotFound(new { message = "Root não encontrado"});
        }

        var dto = FileNodeMapper.MapToDto(tree);

        return Ok(dto
        );
    
    }
}