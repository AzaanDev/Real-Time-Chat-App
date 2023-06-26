class ChatRoom {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    console.log(`User ${user} joined the room ${this.name}`);
  }

  removeUser(user) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
      console.log(`User ${user} left the room ${this.name}`);
    }
  }
}

module.exports = ChatRoom;
