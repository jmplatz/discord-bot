/* eslint-disable linebreak-style */
/* eslint-disable no-console */
module.exports = async (msg) => {
  await msg.channel.send('pong');
  console.log('Reply was sent!');
};
