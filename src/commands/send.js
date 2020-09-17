/* eslint-disable no-console */
require('dotenv').config();
const indexData = require('../index');

const channelID = process.env.GENERAL_CHAT_ID; // Prevent use in gen chat


module.exports = async (msg, args) => {
  if (!args.length || msg.channel.id === channelID) return;


  if (!msg.member.roles.cache.some((role) => role.name === 'Server Manager')) {
    await msg.channel.send(`${msg.author} ${'You do not have permission to to use this command!'}`);
    return;
  }

  var mess = "";

  for (var i = 1; i < args.length; i++) {
    mess += args[i];
    mess += " ";
  }

  // stack overflow stuff
    await indexData.client.channels.cache.get(args[0].toString()).send(mess);
};
