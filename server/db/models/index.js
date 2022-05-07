const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversation = require("./user_conversation");
const UnreadMessage = require("./unreadMessage");

// associations

User.hasMany(Message, {
  foreignKey: {
    name: "senderId",
    allowNull: false,
  },
});
Message.belongsTo(User);

Message.belongsTo(Conversation, {
  foreignKey: {
    allowNull: false,
  },
});
Conversation.hasMany(Message);

// Unread Message associations

Message.hasMany(UnreadMessage, {
  foreignKey: {
    allowNull: false,
  },
});
UnreadMessage.belongsTo(Message);

User.hasMany(UnreadMessage, {
  foreignKey: {
    name: "recipientId",
    allowNull: false,
  },
});
UnreadMessage.belongsTo(User);

Conversation.hasMany(UnreadMessage, {
  foreignKey: {
    allowNull: false,
  },
});
UnreadMessage.belongsTo(Conversation);

// Super Many-to-Many relationship

User.belongsToMany(Conversation, { through: UserConversation });
Conversation.belongsToMany(User, { through: UserConversation });

User.hasMany(UserConversation, {
  foreignKey: {
    allowNull: false,
  },
});
UserConversation.belongsTo(User);

Conversation.hasMany(UserConversation, {
  foreignKey: {
    allowNull: false,
  },
});
UserConversation.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  UserConversation,
  Message,
  UnreadMessage,
};
