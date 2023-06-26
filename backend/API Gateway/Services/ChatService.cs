
namespace Chat.Services
{

    public interface IChatService
    {
        Task<HttpResponseMessage> CreateChat(string Id, string ChatName);
        Task<HttpResponseMessage> GetChats(string Id);
    }

    public class ChatService : IChatService
    {
        private readonly HttpClient _httpClient;

        public ChatService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<HttpResponseMessage> CreateChat(string Id, string ChatName)
        {
            var payload = new FormUrlEncodedContent(new[] {
                new KeyValuePair<string, string>("Id", Id),
                new KeyValuePair<string, string>("ChatName", ChatName)
            });

            var response = await _httpClient.PostAsync("api/Chat/CreateChat", payload);
            return response;
        }
        public async Task<HttpResponseMessage> GetChats(string Id)
        {
            var response = await _httpClient.GetAsync($"api/Chat/GetChats?Id={Id}");
            return response;
        }
    }
}