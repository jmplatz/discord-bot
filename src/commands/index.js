/* eslint-disable linebreak-style */
require('dotenv').config();

const pingCommand = require('./ping');
const eightBall = require('./8Ball');
const list = require('./commandList');

const guildID = process.env.GUILD_ID;
const channelID = process.env.CHANNEL_ID;

const commands = {
  ping: pingCommand,
  '8ball': eightBall,
  commandList: list,
};

module.exports = async (msg) => {
  if (msg.guild.id === guildID && msg.channel.id === channelID) {
    // Getting just the command
    const args = msg.content.split(' ');

    if (args.length === 0 || args[0].charAt(0) !== '!') return;

    const command = args.shift().substr(1);
    if (Object.keys(commands).includes(command)) {
      commands[command](msg, args);
    }
  }
};
