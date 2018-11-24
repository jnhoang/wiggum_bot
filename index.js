require('dotenv').config()
const SlackBot = require('slackbots');
const axios    = require ('axios');

const QUOTES    = require('./ralph_quotes.json');
const EMOJI_OBJ = { icon_emoji: ':ralph_wiggum:' };
const APP_USERNAME = process.env.APP_USERNAME;
const CREATOR_USERNAME = process.env.CREATOR_USERNAME;
console.log('1: ', QUOTES.length)


const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: 'ralph_wiggum'
});


// START HANDLER
bot.on('start', () => bot.postMessageToChannel('test_channel', 'Hi!', EMOJI_OBJ) );


// ERROR HANDLER
bot.on('error', (error) => console.log(error))


// MESSAGE HANDLER
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }
  
  console.log('data:', data);
  handleMessage(data.text);
})



function handleMessage(message) {
  const keywords = ['ralph quote', APP_USERNAME, CREATOR_USERNAME];
  console.log('message: ', message)
  
  if (hasMentionKeywords(message, keywords)) {
    quote = getRandomQuote();
    bot.postMessageToChannel('test_channel', quote, EMOJI_OBJ)
  }
  // else if (message.includes(' ralph gif')) {

  // }
}


const getRandomNum = (len) => Math.floor((Math.random() * len) + 1);
const getRandomQuote = () => QUOTES[getRandomNum(QUOTES.length)];
const hasMentionKeywords = (msg, keywordsArr) => keywordsArr.some((keyword) => msg.includes(keyword));


// console.log(getRandomQuote());
