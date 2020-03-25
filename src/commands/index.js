/* eslint-disable linebreak-style */
require('dotenv').config();

const pingCommand = require('./ping');
const eightBall = require('./8Ball');
const list = require('./commandList');

const guildID = process.env.GUILD_ID;

// Command List Object
const commands = {
  ping: pingCommand,
  '8ball': eightBall,
  commandList: list,
};

module.exports = async (msg) => {
  if (msg.guild.id === guildID) {
    // Getting just the command
    const args = msg.content.split(' ');
    // If it is an empty string or doesn't include !, return
    if (args.length === 0 || args[0].charAt(0) !== '!') return;
    // Remove ! from command
    const command = args.shift().substr(1).toLowerCase();
    // If in list, continue to command
    if (Object.keys(commands).includes(command)) {
      commands[command](msg, args);
    }
  }
};
