require('dotenv').config()
const SlackBot = require('slackbots');
const axios    = require ('axios');

const quotes = require('./ralph_quotes.json');

console.log('1: ', quotes.length)


const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: 'ralph_wiggum'
});

const EMOJI_OBJ = { icon_emoji: ':ralph_wiggum:' }

// START HANDLER
bot.on('start', () => bot.postMessageToChannel('test_channel', 'Hi!', EMOJI_OBJ) );


// ERROR HANDLER
bot.on('error', (error) => console.log(error))


// MESSAGE HANDLER
BOT.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }
  console.log('data:', data);

  handleMessage(data.text);
})


function handleMessage(message) {

}
