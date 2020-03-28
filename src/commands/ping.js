/* eslint-disable no-console */
require('dotenv').config();

const channelID = process.env.CHANNEL_ID;

module.exports = async (msg) => {
  if (msg.channel.id === channelID) return;
  await msg.channel.send('pong');
};
