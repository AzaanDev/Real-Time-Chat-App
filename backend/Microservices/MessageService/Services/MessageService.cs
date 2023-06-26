using MongoDB.Driver;
using Microsoft.Extensions.Options;
using MessageApi.Configurations;
using MessageApi.Models;

namespace MessageApi.Services;

public class MessageService
{
    private readonly IMongoCollection<Message> _Collection;
    public MessageService(IOptions<DatabaseSettings> Settings)
    {
        var client = new MongoClient(Settings.Value.ConnectionURL);
        var MongoDB = client.GetDatabase(Settings.Value.DatabaseName);
        _Collection = MongoDB.GetCollection<Message>(Settings.Value.CollectionName);
    }

    public async Task<List<Message>> GetAsync() => await _Collection.Find(_ => true).ToListAsync();
    public async Task<List<Message>> GetMessagesByChatId(string chatID)
    {
        var sortDefinition = Builders<Message>.Sort.Ascending(x => x.Timestamp);
        var filter = Builders<Message>.Filter.Eq(x => x.ChatID, chatID);

        var messages = await _Collection.Find(filter).Sort(sortDefinition).ToListAsync();
        return messages;
    }
    public async Task CreateChatAsync(Message message) => await _Collection.InsertOneAsync(message);
    public async Task UpdateAsync(Message message) => await _Collection.ReplaceOneAsync(x => x.Id == message.Id, message);
    public async Task RemoveAsync(string id) => await _Collection.DeleteOneAsync(x => x.Id == id);

}