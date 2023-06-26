using Microsoft.AspNetCore.Mvc;
using ChatApi.Services;
using ChatApi.Models;
namespace AccountApi.Controller;

[ApiController]
[Produces("application/json")]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly ChatService _Service;

    public ChatController(ChatService Service) => _Service = Service;

    [HttpPost("CreateChat")]
    public async Task<IActionResult> CreateChat([FromForm] string Id, [FromForm] string ChatName)
    {
        if (string.IsNullOrEmpty(Id) || string.IsNullOrEmpty(ChatName))
        {
            return BadRequest("Id and ChatName are required");
        }

        Chat chat = new Chat(Id, ChatName);
        await _Service.CreateChatAsync(chat);

        return Ok();
    }

    [HttpGet("GetChats")]
    [Produces("application/json")]
    public async Task<IActionResult> GetChats([FromQuery] string Id)
    {
        var message = await _Service.GetChatsByParticipantId(Id);
        return Ok(message);
    }
}
