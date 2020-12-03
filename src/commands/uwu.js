require("dotenv").config();
const indexData = require("../index");
const UWU = process.env.UWUID;

module.exports = async (msg, args) => {
  if (msg.channel.id !== UWU) return;

  message = "";
  for (var i = 0; i < args.length; i++) {
    message += args[i];
    message += " ";
  }

  returnMessage = indexData.owoify(message, 'uwu');

  // stack overflow stuff
  //await indexData.client.channels.cache.get(args[0].toString()).send(mess);
  msg.edit(returnMessage);
};
