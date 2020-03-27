/* eslint-disable linebreak-style */
require('dotenv').config();

const list = require('./commandList');
const pingCommand = require('./ping');
const eightBall = require('./8Ball');
const gif = require('./getGif');

const guildID = process.env.GUILD_ID;

// Command List Object
const commands = {
  ping: pingCommand,
  '8ball': eightBall,
  commandList: list,
  getGif: gif,
};

module.exports = async (msg) => {
  if (msg.guild.id === guildID) {
    // Getting just the command
    const args = msg.content.split(' ');
    console.log(args);
    // If it is an empty string or doesn't include !, return
    if (args[0].charAt(0) !== '!') return;
    console.log(args[0].charAt(0) !== '!');
    // Remove ! from command
    const command = args.shift().substr(1).toLowerCase();
    console.log(command);
    // If in list, continue to command
    if (Object.keys(commands).includes(command)) {
      console.log(Object.keys(commands).includes(command));
      commands[command](msg, args);
    }
  }
};
