const { google } = require('googleapis');
require('dotenv').config();

const Discord = require('../index')

function getWeekDay(date){
  let weekdays = new Array(
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  );
  let day = date.getDay();
  return weekdays[day];
}

function getMonthTextual(date){
  let months = new Array(
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  );
  let month = date.getMonth();
  return months[month];
}

module.exports = async (msg) => {
  const GOOGLE_API = process.env.GOOGLE_API_KEY;
  let response = '';
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  endDate = endDate.toISOString();
  const calendar = google.calendar({ version: 'v3', auth: GOOGLE_API });
  calendar.events.list(
    {
      calendarId: '467isok03ftm8kq343is1b4jfg@group.calendar.google.com',
      timeMin: new Date().toISOString(),
      timeMax: endDate,
      singleEvents: true,
      orderBy: 'startTime',
    },
    async (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const events = res.data.items;

      if (events.length) {
        
        const foundEmbed = new Discord.MessageEmbed().setTitle('Assignments due within the next 7 days:')
        .setDescription('No assignments where found within the next week.')
        .setTimestamp()
	    .setFooter('Something Missing? !addDueDate 2020-12-31 Assignment Title');
        await msg.channel.send(foundEmbed);



      } else {
        const noneFoundEmbed = new Discord.MessageEmbed().setTitle('Upcoming Due Dates')
        .setDescription('No assignments where found within the next week.')
        .setTimestamp()
	    .setFooter('Something Missing? !addDueDate 2020-12-31 Event Title');
        await msg.channel.send(noneFoundEmbed);
      }
    },
  );
};
