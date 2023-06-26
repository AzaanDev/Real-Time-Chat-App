using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ChatApi.Models;

public class Chat
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonElement("Name")]
    public string Name { get; set; }
    [BsonElement("ParticipantList")]
    public List<string> Participants { get; set; }
    [BsonElement("CreatedAt")]
    public DateTime CreatedAt { get; set; }
    [BsonElement("UpdatedAt")]
    public DateTime UpdatedAt { get; set; }

    public Chat(string user_id, string name)
    {
        Participants = new List<string>();
        Participants.Add(user_id);
        Name = name;
        CreatedAt = UpdatedAt = DateTime.UtcNow;
    }
}