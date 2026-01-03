namespace backend.Dtos;

public class FileNodeDto
{
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public long? Size { get; set; }
    public string Date { get; set; } = null!;
    public string Path { get; set; } = null!;
    public List<FileNodeDto> Children { get; set; } = new();
}
