using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using backend.Data;
using backend.Services;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

// JWT KEY
var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new Exception("JWT_KEY não foi identificada no arquivo .env");
}

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Dev", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


//SQLite
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);

// Jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            )
        };
    });

builder.Services.AddSingleton<ITokenService>(
    new TokenService(jwtKey)
);

builder.Services.AddAuthorization();
builder.Services.AddControllers();

builder.Services.AddScoped<FileService>();
builder.Services.AddScoped<FileStorageService>();

builder.Services.AddHostedService<FileCleanUpService>();

var app = builder.Build();

//temporary
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors("Dev");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();