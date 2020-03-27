/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const eightBall = ['As I see it, yes.',
  'Ask again later.',
  'Better not tell you now',
  'Cannot predict now.',
  'It is certain',
  'It is decidedly so.',
  'Outlook not so good',
  'Signs point to yes'];

module.exports = async (msg, args) => {
  if (!args.length) return;
  const i = Math.floor(Math.random() * eightBall.length);
  const reply = eightBall[i];
  await msg.channel.send(`${msg.author} ${reply}`);
};
