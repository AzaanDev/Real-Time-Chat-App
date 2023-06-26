namespace AccountApi.Response.Models;

public class AccountResponse
{
    public Boolean Success { get; set; } = false;
    public string? Id { get; set; } = null!;
    public string? Username { get; set; } = null!;
}