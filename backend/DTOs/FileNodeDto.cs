namespace backend.Dtos;

public class FileNode
{
    public string          Name     { get; set; }
    public string          Type     { get; set; }
    public long?           Size     { get; set; }
    public string          Date     { get; set; }
    public string          Path     { get; set; }
    public List<FileNode>? Children { get; set; }
}