require('dotenv').config()
const SlackBot = require('slackbots');
const axios    = require ('axios');

const QUOTES           = require('./ralph_quotes.json');
const EMOJI_OBJ        = { icon_emoji: ':ralph_wiggum:' };
const APP_USERNAME     = process.env.APP_USERNAME;
const CREATOR_USERNAME = process.env.CREATOR_USERNAME;


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
  else if (data.subtype === 'message_deleted') {
    return;
  }
  
  console.log('data:', data);

  // if anything after handle message, need to add await keyword in front of handleMessage()
  handleMessage(data);
})



const handleMessage = async(data) => {
  const message     = data.text;
  const allChannels = await getChannelList();
  const channelName     = allChannels.filter((channel) => channel.id === data.channel)[0].name;
  console.log('name: ', channelName)
  const keywords    = ['ralph quote', APP_USERNAME, CREATOR_USERNAME];
  
  console.log('message: ', message)
  console.log ('channel to post to: ', channel);
  console.log ('channel name: ', channelName);
  
  if (hasMentionKeywords(message, keywords)) {
    quote = getRandomQuote();
    bot.postMessageToChannel(channel, quote, EMOJI_OBJ)
  }
  // else if (message.includes(' ralph gif')) {

  // }
}


const getRandomNum = (len) => Math.floor((Math.random() * len) + 1);
const getRandomQuote = () => QUOTES[getRandomNum(QUOTES.length)];
const hasMentionKeywords = (msg, keywordsArr) => keywordsArr.some((keyword) => msg.includes(keyword));

const getChannelList = async() => {
  config = {
    params: { token: process.env.SLACK_TOKEN, 'pretty': 1 } 
  };
  let res = await axios.get('https://slack.com/api/conversations.list', config);
  return res.data.channels;
}

