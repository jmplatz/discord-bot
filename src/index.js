/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const Discord = require('discord.js');

const commandHandler = require('./commands');

const client = new Discord.Client();

const {
  BOT_TOKEN,
} = require('./config');

client.once('ready', () => {
  console.log('Beep boop! I am ready!');
});

client.on('message', commandHandler);

client.login(BOT_TOKEN);

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection:', error.message);
  console.error(error);
});
