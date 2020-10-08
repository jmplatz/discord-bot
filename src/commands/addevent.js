const { google } = require("googleapis");
require("dotenv").config();

module.exports = async (msg, args) => {
  // Make sure we have enough arguments.
  if (args.length < 3) {
    await msg.channel.send("<!addDueDate> <yyyy-mm-dd> <event title>");
    return;
  }

  let eventTitle = "";

  for (var i = 1; i < args.length; i++) {
    eventTitle += args[i];
    eventTitle += " ";
  }

  const eventDate = args[0] + "T08:00:00-07:00";
  const eventEnd = args[0] + "T09:00:00-07:00";

  const keysEnvVar = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!keysEnvVar) {
    throw new Error('The $CREDS environment variable was not found!');
  }
  const keys = JSON.parse(keysEnvVar);
  

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: "v3", auth: auth.fromJSON(keys) });
  var event = {
    summary: eventTitle,
    description: "This event was added by ICSBot",
    start: {
      dateTime: eventDate,
      timeZone: "America/Vancouver",
    },
    end: {
      dateTime: eventEnd,
      timeZone: "America/Vancouver",
    },
  };

  calendar.events.insert(
    {
      calendarId: "467isok03ftm8kq343is1b4jfg@group.calendar.google.com",
      resource: event,
    },
    async (err, event) => {
      if (err) {
        await msg.channel.send("Something Went Wrong.");
        console.log(err);
        return;
      }
      await msg.channel.send("Event created: " + event.htmlLink);
      // console.log("Event created: %s", event.htmlLink);
    }
  );
};
