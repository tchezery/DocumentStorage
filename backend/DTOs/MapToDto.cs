using backend.Models;

namespace backend.Dtos;

public static class FileNodeMapper
{
    public static FileNodeDto MapToDto(FileNode node, string currentPath = "")
    {
        var path = string.IsNullOrEmpty(currentPath)
            ? node.Name
            : $"{currentPath}/{node.Name}";

        return new FileNodeDto
        {
            Name = node.Name,
            Type = node.Type,
            Size = node.Blob?.Size,
            Date = node.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
            Path = path,
            Children = node.Children
                .Select(child => MapToDto(child, path))
                .ToList()
        };
    }
}
