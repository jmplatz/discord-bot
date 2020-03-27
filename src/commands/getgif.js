/* eslint-disable linebreak-style */
/* eslint-disable no-console */
require('dotenv').config();
const fetch = require('node-fetch');

const giphyID = process.env.GIPHY_ID;

module.exports = async (msg) => {
  const NUM_TRENDING = 25;
  const rand = Math.floor(Math.random() * NUM_TRENDING);

  const { data } = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${giphyID}&limit=${NUM_TRENDING}&rating=PG-13`)
    .then((response) => response.json());

  msg.channel.send(data[rand].images.original.url);
  console.log('gif was sent!');
};
