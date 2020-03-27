module.exports = async msg => {
    
    const {google} = require('googleapis');
    require('dotenv').config();
    const GOOGLE_API = process.env.GOOGLE_API_KEY;
    var response = "";

    const calendar = google.calendar({version: 'v3', auth: GOOGLE_API});
    calendar.events.list({
    calendarId: '467isok03ftm8kq343is1b4jfg@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 5,
    singleEvents: true,
    orderBy: 'startTime',
    }, async (err, res) => {

    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    
    if (events.length) {
        console.log('Upcoming 5 events:');
        events.map((event, i) => {
        const start = event.start.dateTime.substring(0, 10);
        //console.log(`${start} - ${event.summary}`);
        response += `${start} - ${event.summary}\n`
        });
        await msg.channel.send(response);
    } else {
        console.log('No upcoming events found.');
    }
    });
};
