using Auth.Model;

namespace Auth.Services
{

    public interface IAuthService
    {
        Task<HttpResponseMessage> SignIn(Account account);
        Task<HttpResponseMessage> Login(Account account);
    }

    public class AuthService : IAuthService
    {
        private readonly HttpClient _httpClient;

        public AuthService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<HttpResponseMessage> SignIn(Account account)
        {
            var response = await _httpClient.PostAsJsonAsync("api/Account/Signup", account);
            return response;
        }

        public async Task<HttpResponseMessage> Login(Account account)
        {
            var response = await _httpClient.PostAsJsonAsync("api/Account/Login", account);
            return response;
        }

    }
}