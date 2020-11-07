const { google } = require('googleapis');
require('dotenv').config();

const indexData = require('../index')

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

module.exports = async (msg, args) => {
  const GOOGLE_API = process.env.GOOGLE_API_KEY;
  let dayModifier = 7;
  console.log(args[0]);
  if(args[0] == undefined){
    // Don't need to do anything
  }else if(isNaN(args[0])){
    await msg.channel.send("Invalid Date Modifier, Assuming 7 Days.");
  }else if(args[0] < 7){
    await msg.channel.send("Date Modifier must be at least 7 days");
  }else if(args[0] > 31){
    await msg.channel.send("Max Date Modifier is 31 Days.");
    dayModifier = 31;
  }else{
    dayModifier = args[0];
  }
  let response = '';
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + parseInt(dayModifier));
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
        
        const foundEmbed = new indexData.discord.MessageEmbed();
        foundEmbed.setTitle('Assignments due within the next ' + dayModifier + ' days:');
        

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
              if(i != 0){
                  foundEmbed.addField(title, response, false)
              }
            
            title = ('**Due ' + weekday + " " + monthtext + " " + day + ":**\n")
            response = "";
            currOutput = (weekday + monthtext + day);
          }
          // console.log(`${start} - ${event.summary}`);
          response += ` - \`${event.summary}\` \n`;
        });
        foundEmbed.addField(title, response, false)

        foundEmbed.setTimestamp()
	    foundEmbed.setFooter('Something Missing? !addDueDate 2020-12-31 Assignment Title');
        await msg.channel.send(foundEmbed);


      } else {
        const noneFoundEmbed = new indexData.discord.MessageEmbed();
        noneFoundEmbed.setTitle('Upcoming Due Dates');
        noneFoundEmbed.setDescription('No assignments where found within the next week.');
        noneFoundEmbed.setTimestamp()
	    noneFoundEmbed.setFooter('Something Missing? !addDueDate 2020-12-31 Event Title');
        await msg.channel.send(noneFoundEmbed);
      }
    },
  );
};
