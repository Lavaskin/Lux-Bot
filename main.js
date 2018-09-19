const Discord       = require('discord.io'),
      auth          = require('./resources/auth.json'),
      lavaFuncs     = require('./resources/lavaskinFunctions'),
      insults       = require('./resources/insults.json');


/* 
 * ==================================
 *           BOT FUNCTIONS
 * ================================== 
*/


function sendBotMessage(bot, channelID, message) {
    bot.sendMessage({
        to: channelID,
        message: message
    });
}

function randomInsult() {
    return insults[Math.floor(Math.random() * insults.length)];
}


/* 
 * ==================================
 *           BOT SETUP
 * ================================== 
*/


var botPrefix = '~';
var bot = new Discord.Client({
    token: auth.discordToken,
    autorun: true
});

bot.on('ready', function (evt) {
    console.log(">I've been turned on!\n");
});

bot.on('message', function (user, userID, channelID, message, evt) {
    message = message.toLowerCase();

    //handle generic messages
    if (user === "stinky") {
        sendBotMessage(bot, channelID, randomInsult());
    }
    if (message === "eggplant") {
        sendBotMessage(bot, channelID, ":eggplant:");
    }

    //handle cases where the prefix is used
    if (message[0].toString() === botPrefix) {
        message = message.substring(1);

        //log user messages if not the bot
        if (userID != 491793054894653452) {
            console.log("x==================================x");
            console.log(" User: " + user + " [" + userID + "]");
            console.log(" channelID:", channelID);
            console.log(" Message: \"" + message + "\"");
            console.log("x==================================x");
        }

        switch (message) {
            case "insult": sendBotMessage(bot, channelID, randomInsult());
                break;
        }
    }
});