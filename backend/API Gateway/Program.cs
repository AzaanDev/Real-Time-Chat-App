using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Auth.Services;
using Chat.Services;
using Message.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpClient<IAuthService, AuthService>(client =>
{
    client.BaseAddress = new Uri((builder.Configuration.GetSection("AuthAPI").Value) ?? string.Empty);
});

builder.Services.AddHttpClient<IChatService, ChatService>(client =>
{
    client.BaseAddress = new Uri((builder.Configuration.GetSection("ChatAPI").Value) ?? string.Empty);
});

builder.Services.AddHttpClient<IMessageService, MessageService>(client =>
{
    client.BaseAddress = new Uri((builder.Configuration.GetSection("MessageAPI").Value) ?? string.Empty);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    options.AddPolicy("AllowSpecificOrigin",
       builder => builder.WithOrigins("http://allowed-domain.com"));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "Q8hT5rW2uS4pX6kZ",
            ValidAudience = "J3mB9vD7cR2gY5tE",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("d8be9b5e15b3fc430ce63d01b109da9a82fb246f6cbb1e367d7d96dc50e3c4a6")),
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .Build();
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAnyOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
