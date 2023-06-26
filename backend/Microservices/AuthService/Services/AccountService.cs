using MongoDB.Driver;
using Microsoft.Extensions.Options;
using AccountApi.Configurations;
using AccountApi.Models;

namespace AccountApi.Services;

public class AccountService
{
    private readonly IMongoCollection<Account> _Collection;
    public AccountService(IOptions<DatabaseSettings> Settings)
    {
        var client = new MongoClient(Settings.Value.ConnectionURL);
        var MongoDB = client.GetDatabase(Settings.Value.DatabaseName);
        _Collection = MongoDB.GetCollection<Account>(Settings.Value.CollectionName);
    }

    public async Task<List<Account>> GetAsync() => await _Collection.Find(_ => true).ToListAsync();
    public async Task<Account> GetAccountByUsernameAsync(string username) => await _Collection.Find(x => x.Username == username).FirstOrDefaultAsync();
    public async Task<Account> GetAccountByIdAsync(string Id) => await _Collection.Find(x => x.Id == Id).FirstOrDefaultAsync();
    public async Task<Boolean> UserExistsAsync(string username) => await _Collection.Find(x => x.Username == username).AnyAsync();
    public async Task CreateAsync(Account account) => await _Collection.InsertOneAsync(account);
    public async Task UpdateAsync(Account account) => await _Collection.ReplaceOneAsync(x => x.Id == account.Id, account);
    public async Task RemoveAsync(string id) => await _Collection.DeleteOneAsync(x => x.Id == id);

}