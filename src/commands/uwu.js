require("dotenv").config();
const indexData = require("../index");

module.exports = async (msg, args) => {
  if (msg.channel.id !== 783936497791270972) return;

  message = "";
  for (var i = 0; i < args.length; i++) {
    message += args[i];
    message += " ";
  }

  returnMessage = indexData.owoify(message, 'uwu');

  console.log("Uwued Message: " + returnMessage);
  // stack overflow stuff
  //await indexData.client.channels.cache.get(args[0].toString()).send(mess);
};
