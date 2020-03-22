/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const commands = new Map([
  ['!ping', 'icsBot will reply back with pong.'],
  ['!8ball', '!8ball < insert question > --> icsBot will respond back with an answer.'],
]);

module.exports = async (msg) => {
  let commandList = '';

  commands.forEach((value, key) => {
    commandList += `${key}:   ${value}\n\n`;
  });

  await msg.channel.send(`Command List:\n\n${commandList}`);

  console.log('Reply was sent!');
};
