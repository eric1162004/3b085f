const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversation = require("./user_conversation");

// associations

User.hasMany(Message);
Message.belongsTo(User);

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

// Super Many-to-Many relationship

User.belongsToMany(Conversation, { through: UserConversation });
Conversation.belongsToMany(User, { through: UserConversation });

User.hasMany(UserConversation);
UserConversation.belongsTo(User);

Conversation.hasMany(UserConversation);
UserConversation.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation,
};
