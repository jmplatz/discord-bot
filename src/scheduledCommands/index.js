/* eslint-disable no-console */
const { google } = require('googleapis');
require('dotenv').config();
const indexData = require('../index');

const channelID = process.env.GENERAL_CHAT_ID; // Prevent use in gen chat


module.exports = async () => {
  // Run Two Google Calendar Queries
  const GOOGLE_API = process.env.GOOGLE_API_KEY;
  // I don't feel like messing around with UTC time zones and other date object fun-ness. 
  // So I'm going to generate the UTC Strings myself, with values I know will work.
  // Feel free to make this less kludgy, I'm just too tight on time to experiment

  // EDIT: I ended Up having to do the conversion. This took much more research than I would have liked
  const startDate = new Date();
  startDate.setHours(startDate.getHours() - 8); // PST Conversion
  startDate.setHours(7, 0, 0, 0);
  const todays_day = startDate.getDate();
  const todays_month = startDate.getMonth();
  const todays_year = startDate.getFullYear();


  if (todays_day < 10){
    todays_day = "0" + todays_day;
  }
  if (todays_month < 10){
    todays_month = "0" + todays_month;
  }


  const endDate = new Date();
  endDate.setHours(endDate.getHours() - 8); // PST Conversion
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(19, 59, 59, 0);
  const startDateString = startDate.toISOString();
  const endDateString = endDate.toISOString();
  console.log("[DEBUG]: " + startDateString + " " + endDateString);

  // Get stuff from today
  let dayOneOutput = "";
  let isDayOne = false;

  let dayTwoOutput = "";
  let isDayTwo = false;
  const calendar = google.calendar({ version: 'v3', auth: GOOGLE_API });
  calendar.events.list(
    {
      calendarId: '467isok03ftm8kq343is1b4jfg@group.calendar.google.com',
      timeMin: startDateString,
      timeMax: endDateString,
      singleEvents: true,
      orderBy: 'startTime',
    },
    async (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const events = res.data.items;
      if (events.length) {
        // Yes Events
        events.map((event, i) => {

          const start = event.start.dateTime.substring(0, 10);

          if(start == (todays_year + "-" + todays_month + "-" + todays_day)){
            isDayOne = true;
            dayOneOutput += ` - \`${event.summary}\` \n`;
          }else{
            isDayTwo = true;
            dayTwoOutput += ` - \`${event.summary}\` \n`;
          }
          console.log(event.summary);
        });

        if (!isDayTwo && !isDayOne){
          // There is nothing due today or tomorrow, return now
          return;
        }

        console.log("[DEBUG]: " + isDayOne + " " + isDayTwo);
        console.log("[DEBUG]: " + dayOneOutput + " " + dayTwoOutput);


        if (!isDayOne){
          dayOneOutput = "Nothing Due Today!";
        }
        if (!isDayTwo){
          dayTwoOutput = "Nothing Due Tomorrow!";
        }

        const foundEmbed = new indexData.discord.MessageEmbed();
        foundEmbed.setTitle('Good Morning! ');
        foundEmbed.addField("Due Today: ", dayOneOutput , false);
        foundEmbed.addField("Due Tomorrow: ", dayTwoOutput , false);
        foundEmbed.setTimestamp();
        foundEmbed.setFooter('Something Missing? !addDueDate 2020-12-31 Assignment Title');
        await indexData.client.channels.cache.get("753718038280536064").send(foundEmbed);

        } else {
          // No Events
        }

    });

      


};
