/* eslint-disable no-console */
require('dotenv').config();

const channelID = process.env.GENERAL_CHAT_ID; // Prevent use in gen chat


module.exports = async (msg, args) => {
  if (!args.length || msg.channel.id === channelID) return;


  if (!message.member.roles.cache.some((role) => role.name === 'Server Manager')) {
    await msg.channel.send(`${msg.author} ${'You do not have permission to to use this command!'}`);
    return;
  }

  // stack overflow stuff
    await client.channels.cache.get(args[0].toString()).send(args[1].toString());
};
