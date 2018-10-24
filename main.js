/*
 * MADE USING THE ERIS LIBRARY
 * 
 * CHECK OUT ITS DOCS HERE: https://abal.moe/Eris/
 */

const Eris      = require('eris'),
      auth      = require('./resources/auth.json'),
      figlet    = require('figlet');
      insults   = require('./resources/insults.json'),
      lavaFuncs = require('./resources/lavaskinFunctions');


/* 
 * ==================================
 *           BOT FUNCTIONS
 * ================================== 
 */

// function botGetMessages(bot, channelID, limit) {
//     let before, after;

//     bot.getMessages(channelID, before, after, limit, (error, messageArray) => {
//         if (!error){
//             //console.log("!err: ", messageArray);
//             return messageArray;
//         } else {
//             console.dir(error);
//         }
//     });

//     console.log("xx  botGetMessages: Couldn't fetch messages/");
// }

// function botDeleteMessages(bot, channelID, messageIDs) {
//     bot.deleteMessages(channelID, messageIDs, (err) => {
//         if (err) {
//             console.dir(err);
//         }
//     })
// }


/* 
 * ==============================
 *           BOT SETUP
 * ==============================
 */

 
var botPrefix = '~';
//Make a JSON file with a key: "discordToken", and then value of your token
var bot = new Eris(auth.discordToken);

//Bot turned on
bot.on('ready', () => {
    console.log(">I've been turned on!\n");
});

bot.connect();

//Handling Messages
bot.on('messageCreate', (msg) => {
    let channel = msg.channel.id;
    let message = msg.content.toLowerCase()

    //handle cases where the prefix is used
    if (message[0].toString() === botPrefix) {
        message = message.substring(1);

        console.log("x==================================x");
        console.log(" User: " + msg.author.username + " " + msg.author);
        console.log(" channelID:", channel);
        console.log(" Message: \"" + message + "\"");
        console.log("x==================================x");

        //[0] of messageArray is the command, everything else are arguments
        let messageArray = message.split(" ");
        let command = messageArray.shift();
        let args = messageArray;

        switch (command) {
            //TESTS THE BOTS CONNECTIVITY
            case "ping":
                bot.createMessage(channel, "Pong!");
                break;

            //POSTS A RANDOM INSULT
            case "insult":
                bot.createMessage(channel, insults[Math.floor(Math.random() * insults.length)].toString());
                break;

            //ADDS GIVEN NUMBERS
            case "add":
                if (args.length > 1) {
                    let result = 0;

                    for (let i = 0; i < args.length; i++) {
                        args[i] = parseFloat(args[i]);

                        if (typeof(args[i]) === "number")
                            result += args[i];
                    }
                    
                    bot.createMessage(channel, msg.author.mention + ", here's your result: " + result);
                } else {
                    bot.createMessage(channel, msg.author.mention + ", you need at least two numbers to add.");
                }
                break;
                
            //REMOVES MESSAGES FROM A CHANNEL
            // case "cleanchat":
            //     //only Lavaskin for now
            //     if (userID === "148907812670406656") {
            //         if (args.length === 1) {
            //             let numMessages = parseInt(args[0]);

            //             if (typeof(numMessages) === "number") {
            //                 botDeleteMessages(botGetMessages(parseFloat(args[0]), channelID));
            //             } else {
            //                 sendBotMessage(bot, channelID, "@" + user + ", The argument must contain numbers.");
            //             }
            //         } else {
            //             botDeleteMessage(botGetMessages(1, channelID));
            //         }
            //     } else {
            //         sendBotMessage(bot, channelID, "@" + user + ", you don't have permission to use that command.");
            //     }
            //     break;
            case "test":
                let x = botGetMessages(bot, chanenel, 5);
                console.log(x);
                break;

            //ASCII TEXT GENERATOR
            case "figlet":
                if (args.length === 0)
                    bot.createMessage(channel, msg.author.mention + ", this command requires 1 word max.");
                else {
                    figlet(args.toString(), (err, data) => {
                        if (err)
                            console.dir(err);
                        else
                            bot.createMessage(channel, "```\n" + data + "\n```");
                    });
                }
                break;
            
            //BINARY TO DECIMAL CONVERSION
            case "btod":
                if (args[0].length < 99 && args[0].length > 0)
                    bot.createMessage(channel, "The decimal for " + args[0] + " = " + lavaFuncs.binaryToDecimal(args[0]) + ".");
                else
                    bot.createMessage(channel, msg.author.mention + ", must be at least 1b and less than 9b.");
                break;

            //DECIMAL TO BINARY CONVERSION
            case "dtob":
                bot.createMessage(channel, "The binary for " + args[0] + "= \"" + lavaFuncs.decimalToBinary(parseInt(args[0])) + "\".");
                break;
        }
    }
});