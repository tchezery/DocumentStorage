namespace backend.Models;

public class Files
{
    public int Id { get; set; }
    public string Code { get; set; }
    public string FileName { get; set; }
    public string FilePath { get; set; }
    public long Size { get; set; }
    public DateTime CreateAt { get; set; } = DateTime.UtcNow;
}
