/* eslint-disable no-console */
require('dotenv').config();

const listCommand = require('./commandlist');
const pingCommand = require('./ping');
const eightBallCommand = require('./8ball');
const gifCommand = require('./getgif');
const listAssignmentsCommand = require('./upcomingAssignments');
const uptimeCommand = require('./uptime.js');

const guildID = process.env.GENERAL_CHAT_ID;

// Command List Object
const commands = {
  ping: pingCommand,
  '8ball': eightBallCommand,
  commandlist: listCommand,
  getgif: gifCommand,
  upcomingduedates: listAssignmentsCommand,
  uptime: uptimeCommand,
};

module.exports = async (msg) => {
  if (msg.guild.id === guildID) {
    // Getting just the command
    const args = msg.content.split(' ');
    // If it is an empty string or doesn't include !, return
    if (args[0].charAt(0) !== '!') return;
    // Remove ! from command
    const command = args.shift().substr(1).toLowerCase();
    // If in list, continue to command
    if (Object.keys(commands).includes(command)) {
      commands[command](msg, args);
    }
  }
};
