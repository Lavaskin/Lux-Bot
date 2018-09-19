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

// function botGetMessages(bot, channelID, numMessages) {
//     bot.getMessages(channelID, null, null, numMessages, function(err, array) {
//         if (!err){ 
//             return array;
//         } else {
//             console.log("x " + err);
//         }
//     });
// }

// function botDeleteMessages(bot, channelID, messageIDs) {
//     bot.deleteMessages(channelID, messageIDs, function(err) {
//         if (err) {
//             console.log("x " + err);
//         }
//     })
// }

function randomInsult() {
    return insults[Math.floor(Math.random() * insults.length)];
}


/* 
 * ==============================
 *           BOT SETUP
 * ==============================
*/


var botPrefix = '~';
var bot = new Discord.Client({
    token: auth.discordToken,
    autorun: true
});

//Bot turned on
bot.on('ready', function (evt) {
    console.log(">I've been turned on!\n");
});

//Handling Messages
bot.on('message', function (user, userID, channelID, message, evt) {
    message = message.toLowerCase();

    //handle generic messages
    // if (userID === "425421488703668224" || userID === "164545170161926145") {
    //     sendBotMessage(bot, channelID, randomInsult());
    // }

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

        //[0] of messageArray is the command, everything else are arguments
        let messageArray = message.split(" ");
        let command = messageArray.shift();
        let args = messageArray;

        switch (command) {
            case "insult":
                sendBotMessage(bot, channelID, randomInsult());
                break;
            case "add":
                if (args.length > 1) {
                    let result = 0;

                    for (let i = 0; i < args.length; i++) {
                        args[i] = parseFloat(args[i]);

                        if (typeof(args[i]) === "number")
                            result += args[i];
                    }
                    
                    sendBotMessage(bot, channelID, "@" + user + ", here's your result: " + result);
                } else {
                    sendBotMessage(bot, channelID, "@" + user + ", you need at least two numbers to add.");
                }
                break;
            case "cleanchat":
                //only Lavaskin for now
                // if (userID === "148907812670406656") {
                //     if (args.length === 1) {
                //         let numMessages = parseInt(args[0]);

                //         if (typeof(numMessages) === "number") {
                //             botDeleteMessages(botGetMessages(parseFloat(args[0]), channelID));
                //         } else {
                //             sendBotMessage(bot, channelID, "@" + user + ", The argument must contain numbers.");
                //         }
                //     } else {
                //         botDeleteMessage(botGetMessages(1, channelID));
                //     }
                // } else {
                //     sendBotMessage(bot, channelID, "@" + user + ", you don't have permission to use that command.");
                // }
                // break;
        }
    }
});