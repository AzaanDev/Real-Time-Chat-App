using MongoDB.Driver;
using Microsoft.Extensions.Options;
using ChatApi.Configurations;
using ChatApi.Models;

namespace ChatApi.Services;

public class ChatService
{
    private readonly IMongoCollection<Chat> _Collection;
    public ChatService(IOptions<DatabaseSettings> Settings)
    {
        var client = new MongoClient(Settings.Value.ConnectionURL);
        var MongoDB = client.GetDatabase(Settings.Value.DatabaseName);
        _Collection = MongoDB.GetCollection<Chat>(Settings.Value.CollectionName);
    }

    public async Task<List<Chat>> GetAsync() => await _Collection.Find(_ => true).ToListAsync();
    public async Task<List<Chat>> GetChatsByParticipantId(string user_id) => await _Collection.Find(x => x.Participants.Contains(user_id)).ToListAsync();
    public async Task CreateChatAsync(Chat chat) => await _Collection.InsertOneAsync(chat);
    public async Task UpdateAsync(Chat chat) => await _Collection.ReplaceOneAsync(x => x.Id == chat.Id, chat);
    public async Task RemoveAsync(string id) => await _Collection.DeleteOneAsync(x => x.Id == id);

}