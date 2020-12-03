require("dotenv").config();
const indexData = require("../index");
const UWU = process.env.UWUID;
const icsBotID = process.env.BOTID;

module.exports = async (msg, args) => {
  if (msg.channel.id !== UWU) return;
  if (msg.author.id === icsBotID) return;

  message = "";
  for (var i = 0; i < args.length; i++) {
    message += args[i];
    message += " ";
  }

  returnMessage = indexData.owoify(message, 'uwu');
  username = msg.author.username;
  returnMessage = ": " + username + " : " + returnMessage;
  // stack overflow stuff
  //await indexData.client.channels.cache.get(args[0].toString()).send(mess);
  msg.channel.send(returnMessage).then(() => {
    msg.delete();
  })
  
};
