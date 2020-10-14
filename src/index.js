/* eslint-disable no-console */
const Discord = require('discord.js');
const commandHandler = require('./commands');
const vcHandler = require('./vcManagement')
// Create new instance of Client
const client = new Discord.Client();

const {
  BOT_TOKEN,
} = require('./config');

client.once('ready', () => {
  console.log('Beep boop! I am ready!');
});

client.on('message', commandHandler);
client.on('voiceStateUpdate', vcHandler)

client.login(BOT_TOKEN);

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection:', error.message);
  console.error(error);
});

exports.client = client;
exports.discord = Discord;
