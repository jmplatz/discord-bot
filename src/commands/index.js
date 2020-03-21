/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const ping = require('./ping');
const eightBall = require('./8Ball');

const guildID = '425816077176406029';
const channelID = '425816077176406032';

const commands = {
  ping,
  '8Ball': eightBall,
};

module.exports = async (msg) => {
  console.log(msg);
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
