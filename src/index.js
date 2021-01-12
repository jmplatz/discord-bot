/* eslint-disable no-console */
const Discord = require('discord.js');
const schedule = require('node-schedule');
const commandHandler = require('./commands');
const vcHandler = require('./vcManagement')
const scheduledCommands = require('./scheduledCommands');
const reactionManagement = require('./reactionManagement');
const owoify = require('owoify-js').default
// Create new instance of Client
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const {
  BOT_TOKEN,
} = require('./config');

client.once('ready', () => {
  console.log('Beep boop! I am ready!');
});

client.on('message', commandHandler);
client.on('voiceStateUpdate', vcHandler);
client.on('messageReactionAdd', reactionManagement);

client.login(BOT_TOKEN);

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection:', error.message);
  console.error(error);
});

exports.client = client;
exports.discord = Discord;
exports.owoify = owoify;

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 8;
rule.minute = 0;
rule.tz = 'America/Vancouver';

// Runs at 0800 every day
var j = schedule.scheduleJob(rule, scheduledCommands);
