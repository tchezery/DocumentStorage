namespace backend.Models;

public class FileBlob
{
    public int Id { get; set; }
    public string Hash { get; set; } = null!;
    public string StoragePath { get; set; } = null!;
    public long Size { get; set; }
}


