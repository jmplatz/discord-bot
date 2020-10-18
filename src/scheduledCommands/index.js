/* eslint-disable no-console */
require('dotenv').config();
const indexData = require('../index');

const channelID = process.env.GENERAL_CHAT_ID; // Prevent use in gen chat


module.exports = async () => {
  // Run Two Google Calendar Queries
  const GOOGLE_API = process.env.GOOGLE_API_KEY;
  // I don't feel like messing around with UTC time zones and other date object fun-ness. 
  // So I'm going to generate the UTC Strings myself, with values I know will work.
  // Feel free to make this less kludgy, I'm just too tight on time to experiment
  const date = new Date();
  const todays_day = date.getDate();
  const todays_month = date.getMonth() + 1;
  const todays_year = date.getFullYear();

  let tomorrowDate = new Date();
  tomorrowDate = tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow_day = tomorrowDate.getDate();
  const tomorrow_month = tomorrowDate.getMonth() + 1;
  const tomorrow_year = tomorrowDate.getFullYear();

  let dayAfterTomorrow = new Date();
  dayAfterTomorrow = dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
  const dayAfterTomorrow_day = dayAfterTomorrow.getDate();
  const dayAfterTomorrow_month = dayAfterTomorrow.getMonth() + 1;
  const dayAfterTomorrow_year = dayAfterTomorrow.getFullYear();
  //2020-10-20T07:00:00.000Z
  const dayOneStart = (todays_year + "-" + todays_month + "-" + todays_day + "T07:00:00.000Z");
  const dayOneEnd = (tomorrow_year + "-" + tomorrow_month + "-" + tomorrow_day + "T06:00:00.000Z");
  
  const dayTwoStart = (tomorrow_year + "-" + tomorrow_month + "-" + tomorrow_day + "T07:00:00.000Z");
  const dayTwoEnd = (dayAfterTomorrow_year + "-" + dayAfterTomorrow_month + "-" + dayAfterTomorrow_day + "T06:00:00.000Z");
  // Get stuff from today
  let dayOneOutput = "";
  let isDayOne = false;

  let dayTwoOutput;
  let isDayTwo = false;
  const calendar = google.calendar({ version: 'v3', auth: GOOGLE_API });
  calendar.events.list(
    {
      calendarId: '467isok03ftm8kq343is1b4jfg@group.calendar.google.com',
      timeMin: dayOneStart,
      timeMax: dayOneEnd,
      singleEvents: true,
      orderBy: 'startTime',
    },
    async (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const events = res.data.items;
      if (events.length) {
        // Yes Events
        isDayOne = true;
        events.map((event, i) => {
          dayOneOutput += ` - \`${event.summary}\` \n`;
        });

      } else {
        // No Events
        dayOneOutput = "Nothing Due Today!";
      }

    });

    calendar.events.list(
      {
        calendarId: '467isok03ftm8kq343is1b4jfg@group.calendar.google.com',
        timeMin: dayTwoStart,
        timeMax: dayTwoEnd,
        singleEvents: true,
        orderBy: 'startTime',
      },
      async (err, res) => {
        if (err) return console.log(`The API returned an error: ${err}`);
        const events = res.data.items;
        if (events.length) {
          // Yes Events
          isDayTwo = true;
          events.map((event, i) => {
            dayTwoOutput += ` - \`${event.summary}\` \n`;
          });
  
        } else {
          // No Events
          dayTwoOutput = "Nothing Due Tomorrow!";
        }
  
      });

      if (!isDayTwo && !isDayOne){
        // There is nothing due today or tomorrow, return now
        return;
      }

      const foundEmbed = new indexData.discord.MessageEmbed();
      foundEmbed.setTitle('Good Morning! Here\'s what\'s due Today and Tomorrow: ');
      foundEmbed.addField("Due Today: ", dayOneOutput , false);
      foundEmbed.addField("Due Tomorrow: ", dayTwoOutput , false);
      foundEmbed.setTimestamp();
      foundEmbed.setFooter('Something Missing? !addDueDate 2020-12-31 Assignment Title');



    // This Sends To Admin-Zone For now, for testing
    await indexData.client.channels.cache.get("753718038280536064").send(foundEmbed);
};
