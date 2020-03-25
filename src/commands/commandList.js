/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const commands = new Map([
  ['!ping', 'icsBot will reply back with pong.'],
  ['!8ball', '!8ball < insert question > --> icsBot will respond back with an answer.'],
]);

// Returns command list
module.exports = async (msg) => {
  let commandList = '';

  // Loop through commands and append to command list
  commands.forEach((value, key) => {
    commandList += `${key}:   ${value}\n\n`;
  });

  await msg.channel.send(`Command List:\n\n${commandList}`);
};
