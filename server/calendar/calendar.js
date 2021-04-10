const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const addEvent = (req, res) => {
   // req.user is the login user
  var oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    "/google-login/redirect"
  );
  console.log(req.user);
  oauth2Client.setCredentials({
    access_token: req.user.access_token,
    refresh_token: req.user.refresh_token
  });

  console.log(oauth2Client);

  var calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client
  });
  const event = {
    summary: req.body.summary,
    location: req.body.location,
    description: req.body.description,
    start: {
      dateTime: req.body.dateTime,
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: new Date(req.body.dateTime).setMinutes(new Date(req.body.dateTime).getMinutes() + 120),
      timeZone: 'America/New_York'
    },
    colorId: 1,

  }

  calendar.events.insert({calendarId: 'primary', resource: event}, (err) => {
    console.log(err);
    res.sendStatus(200);
  });
}

module.exports = { addEvent };