using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class FileNode
{
    public int              Id          { get; set; }
    
    public string           Name        { get; set; } = null!;
    public string           Type        { get; set; } = null!;

    public int?             ParentId    { get; set; }
    public FileNode?        Parent      { get; set; }

    public int?             BlobId      { get; set; }
    public FileBlob?        Blob        { get; set; }

    public DateTime         CreatedAt   { get; set; } = DateTime.UtcNow;
    public DateTime?        ExpiresAt   { get; set; }

    [NotMapped]
    public List<FileNode>   Children    { get; set; } = new();
}