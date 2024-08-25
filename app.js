require('dotenv').config();
const { ACCOUNT_SID, AUTH_TOKEN } = process.env;
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
const app = express();

// Middleware to parse the body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const incomingMsg = req.body.Body.trim().toLowerCase();
  const from = req.body.From;

  let responseMsg = '';

  // Simple bot logic
  if (incomingMsg === 'hello') {
    responseMsg = 'Hi there! How can I assist you today?';
  } else {
    responseMsg = `You said: ${incomingMsg}`;
  }

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(responseMsg);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
