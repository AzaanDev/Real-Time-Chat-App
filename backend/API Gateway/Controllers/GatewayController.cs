using Microsoft.AspNetCore.Mvc;
using Auth.Services;
using Auth.Model;
using Message.Services;
using Message.Models;
using Chat.Services;
using CreateChatModel.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AuthResponse.Model;

namespace Gateway.Controller;

[ApiController]
[Authorize]
[Route("api/")]
public class GatewayController : ControllerBase
{
    private readonly IAuthService _AuthService;
    private readonly IChatService _ChatService;
    private readonly IMessageService _MessageService;

    public GatewayController(IAuthService AuthService, IChatService ChatService, IMessageService MessageService)
    {
        _AuthService = AuthService;
        _ChatService = ChatService;
        _MessageService = MessageService;
    }

    [AllowAnonymous]
    [HttpPost("Signup")]
    public async Task<IActionResult> Signup(Account account)
    {
        var response = await _AuthService.SignIn(account);
        var message = await response.Content.ReadAsStringAsync();
        var statusCode = (int)response.StatusCode;
        return StatusCode(statusCode, message);
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    [Produces("application/json")]
    public async Task<IActionResult> Login(Account account)
    {
        var response = await _AuthService.Login(account);
        AccountResponse? message = await response.Content.ReadFromJsonAsync<AccountResponse>();
        if (message?.Id == null || message?.Username == null)
        {
            var FailureResponse = new
            {
                success = false,
            };
            return StatusCode(401, FailureResponse);
        }


        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes("d8be9b5e15b3fc430ce63d01b109da9a82fb246f6cbb1e367d7d96dc50e3c4a6");

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                    new Claim(ClaimTypes.NameIdentifier, message.Id),
                    new Claim(ClaimTypes.Name, message.Username)
                }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature),
            Audience = "J3mB9vD7cR2gY5tE",
            Issuer = "Q8hT5rW2uS4pX6kZ"
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);

        message.Token = jwtToken;

        return Ok(message);
    }

    [HttpGet("GetChats")]
    [Produces("application/json")]
    public async Task<IActionResult> GetChats([FromQuery] string Id)
    {
        var r = await _ChatService.GetChats(Id);
        var message = await r.Content.ReadAsStreamAsync();
        return Ok(message);
    }

    [HttpGet("GetMessages")]
    [Produces("application/json")]
    public async Task<IActionResult> GetMessages([FromQuery] string Id)
    {
        var r = await _MessageService.GetMessages(Id);
        var message = await r.Content.ReadAsStreamAsync();
        return Ok(message);
    }

    [HttpPost("SendMessage")]
    [Produces("application/json")]
    public async Task<IActionResult> SendMessage([FromBody] SendMessageFormat message)
    {
        var r = await _MessageService.CreateMessage(message);
        return Ok(r.Content);
    }

    [HttpPost("CreateChat")]
    [Produces("application/json")]
    public async Task<IActionResult> CreateChat([FromBody] CreateChatData Data)
    {
        if (Data.Id == null || Data.ChatName == null)
        {
            return StatusCode(400);
        }

        var message = await _ChatService.CreateChat(Data.Id, Data.ChatName);
        return Ok(message.Content);
    }

}