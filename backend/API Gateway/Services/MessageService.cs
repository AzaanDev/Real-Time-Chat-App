using System.Text;
using Message.Models;
using Newtonsoft.Json;

namespace Message.Services
{

    public interface IMessageService
    {
        Task<HttpResponseMessage> CreateMessage(SendMessageFormat message);
        Task<HttpResponseMessage> GetMessages(string Id);
    }

    public class MessageService : IMessageService
    {
        private readonly HttpClient _httpClient;

        public MessageService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<HttpResponseMessage> CreateMessage(SendMessageFormat message)
        {

            var content = new StringContent(JsonConvert.SerializeObject(message), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("api/Message/SendMessage", content);
            return response;
        }
        public async Task<HttpResponseMessage> GetMessages(string Id)
        {
            var response = await _httpClient.GetAsync($"api/Message/GetMessages/{Id}");
            return response;
        }
    }
}