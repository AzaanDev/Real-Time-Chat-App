using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MessageApi.Models;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonElement("ChatID")]
    public string? ChatID { get; set; }
    [BsonElement("Sender")]
    public string? Sender { get; set; }
    [BsonElement("Content")]
    public string? Content { get; set; }


    [BsonElement("Timestamp")]
    public DateTime Timestamp { get; set; }

    public Message()
    {
        Timestamp = DateTime.UtcNow;
    }
}