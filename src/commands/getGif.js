/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const fetch = require('node-fetch');

module.exports = async (msg) => {
  const { file } = await fetch('https://aws.random.cat/meow').then((response) => response.json());

  msg.channel.send(file);
  console.log('gif was sent!');
};
