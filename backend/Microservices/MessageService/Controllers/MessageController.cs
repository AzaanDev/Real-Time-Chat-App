using Microsoft.AspNetCore.Mvc;
using MessageApi.Services;
using MessageApi.Models;

namespace MessageApi.Controller;

[ApiController]
[Produces("application/json")]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly MessageService _Service;

    public MessageController(MessageService Service) => _Service = Service;

    [HttpPost("SendMessage")]
    public async Task<IActionResult> SendMessage([FromBody] Message message)
    {
        await _Service.CreateChatAsync(message);
        return Ok();
    }

    [HttpGet("GetMessages/{chatID}")]
    public async Task<IActionResult> GetMessages(string chatID)
    {
        var messages = await _Service.GetMessagesByChatId(chatID);
        return Ok(messages);
    }
}
