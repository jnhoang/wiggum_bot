require('dotenv').config()
const SlackBot = require('slackbots');
const axios    = require ('axios');

const QUOTES    = require('./ralph_quotes.json');
const EMOJI_OBJ = { icon_emoji: ':ralph_wiggum:' }

console.log('1: ', QUOTES.length)


// const bot = new SlackBot({
//   token: process.env.SLACK_TOKEN,
//   name: 'ralph_wiggum'
// });


// // START HANDLER
// bot.on('start', () => bot.postMessageToChannel('test_channel', 'Hi!', EMOJI_OBJ) );


// // ERROR HANDLER
// bot.on('error', (error) => console.log(error))


// // MESSAGE HANDLER
// BOT.on('message', (data) => {
//   if (data.type !== 'message') {
//     return;
//   }
//   console.log('data:', data);

//   handleMessage(data.text);
// })


function handleMessage(message) {
  if (message.includes(' ralph quote')) {
    getRandomQuote();
  }
  else if (message.includes(' ralph gif')) {
    
  }
}


const getRandomQuote = () => {
  const qoutesLen = QUOTES.length;
  const quote     = QUOTES[getRandomNum(qoutesLen)];
  return quote;
}


const getRandomNum = (len) => Math.floor((Math.random() * len) + 1);



console.log(getRandomQuote());
