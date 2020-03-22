/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const Discord = require('discord.js');
// const express = require('express');
const commandHandler = require('./commands');

const client = new Discord.Client();

// const app = express();

// app.set('port', (process.env.PORT || 5000));
// // For avoidong Heroku $PORT error
// app.get('/', (request, response) => {
//   const result = 'App is running';
//   response.send(result);
// }).listen(app.get('port'), () => {
//   console.log('App is running, server is listening on port ', app.get('port'));
// });

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
