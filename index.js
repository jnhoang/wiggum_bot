require('dotenv').config()
const SlackBot = require('slackbots');
const axios    = require ('axios');


const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: 'ralph_wiggum'
});

// Start Handler
bot.on('start', () => {
  const params = { icon_emoji: ':ralph_wiggum:' };
  bot.postMessageToChannel('test_channel', 'Hi!', params);
});


// Error Handler
bot.on('error', (error) => console.log(error))


// Message handler
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }
  console.log('data:', data)

  handleMessage(data.text);
})


function handleMessage(message) {

}
