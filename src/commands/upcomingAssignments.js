const { google } = require('googleapis');
require('dotenv').config();

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
        response += ('Upcoming 7 days of Assignments: \n');
        let currOutput = ""
        events.map((event, i) => {
          const start = event.start.dateTime.substring(0, 10);
          const year = start.substring(0, 4);
          const month = start.substring(5, 7);
          const day = start.substring(8, 10);
          let date = new Date(year, month - 1, day);
          const weekday = getWeekDay(date);
          const monthtext = getMonthTextual(date);
          
          if(currOutput != weekday + monthtext + day){
            response += ('**Due ' + weekday + " " + monthtext + " " + day + ":**\n")
            currOutput = (weekday + monthtext + day);
          }
          // console.log(`${start} - ${event.summary}`);
          response += ` \`${event.summary}\`\n`;
        });
        await msg.channel.send(response);
      } else {
        response += ('No events in the next 7 days found.');
        await msg.channel.send(response);
      }
    },
  );
};
