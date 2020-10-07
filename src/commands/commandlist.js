/* eslint-disable no-console */
const commands = new Map([
  ['!ping', 'icsBot will reply back with pong.'],
  ['!8ball', '!8ball < insert question > --> icsBot will respond back with an answer.'],
  ['!getgif', 'icsBot will respond back with a random gif!'],
  ['!upcomingduedates', 'Prints out the next 7 days of assignments.'],
  ['!addevent', '<!addevent> yyyy-mm-dd event name'],
  ['!uptime', 'icsBot will tell you how long it\'s been running.'],
]);

// Returns command list
module.exports = async (msg) => {
  let commandList = '';

  // Loop through commands and append to command list
  commands.forEach((value, key) => {
    commandList += `${key}:   ${value}\n\n`;
  });

  await msg.channel.send(`Command List:\n\n${commandList}`);
  console.log('commandList was sent!');
};
