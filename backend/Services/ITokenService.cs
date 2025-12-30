using backend.Models;

namespace backend.Services;

public interface ITokenService
{
    string Generate(User user);
}