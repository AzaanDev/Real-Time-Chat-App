using Microsoft.AspNetCore.Mvc;
using AccountApi.Services;
using AccountApi.Models;
using BCrypt.Net;
using AccountApi.Response.Models;
namespace AccountApi.Controller;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly AccountService _Service;

    public AccountController(AccountService Service) => _Service = Service;

    [HttpPost("Signup")]
    public async Task<IActionResult> Signup(Account account)
    {
        var Exists = await _Service.UserExistsAsync(account.Username);
        if (Exists)
            return Ok("User Already Exists");

        account.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);
        try
        {
            await _Service.CreateAsync(account);
            return Ok("Account Created");
        }
        catch
        {
            return StatusCode(500, "An error occurred during account creation");
        }
    }

    [HttpPost("Login")]
    [Produces("application/json")]
    public async Task<IActionResult> Login(Account account)
    {
        AccountResponse r = new AccountResponse();

        var Exists = await _Service.UserExistsAsync(account.Username);
        if (!Exists)
            return StatusCode(500, r);

        var VerifyAccount = await _Service.GetAccountByUsernameAsync(account.Username);
        bool passwordMatches = BCrypt.Net.BCrypt.Verify(account.Password, VerifyAccount.Password);
        if (!passwordMatches)
        {
            return StatusCode(500, r);
        }
        r.Success = true;
        r.Id = VerifyAccount.Id;
        r.Username = VerifyAccount.Username;
        return Ok(r);
    }

    /*
    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {

    }
    */
}