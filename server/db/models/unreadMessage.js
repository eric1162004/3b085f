const db = require("../db");

const UnreadMessage = db.define("unread_message", {});

module.exports = UnreadMessage;