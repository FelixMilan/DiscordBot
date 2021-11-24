
import DiscordJS, { Intents } from 'discord.js' //create access to discord.js so we can use discord.js node modules in this file
import dotenv from 'dotenv'
dotenv.config() //gives us access to our .env file so we can use our token etc.

const client = new DiscordJS.Client({ //required to provide 'intents' on what we'll do with our bot
    intents: [
        Intents.FLAGS.GUILDS, //if you use CTRL+SPACE you can auto import Intents from discord.js
        Intents.FLAGS.GUILD_MESSAGES, //guilds are what are commonly referred to as servers
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS //allow for reactions to messages
    ]
})

let Counter = 0;
let LastSender = 0;

client.on('ready', () => {  //when the bot goes online create a console log
    console.log('MMUCSBot is online!')

    const guildID = process.env.GUILD //server ID needed when testing bots as you can only test at one server at a time
    const guild = client.guilds.cache.get(guildID) //get test guild
    let commands

    if (guild) { //make a command line that means we can test new changes on our test server instead of globally
        commands = guild.commands
    } else {
        commands = client.application?.commands //else run across all servers that this bot exists in
    }

    commands?.create({ //create a command
        name: 'marco', //the slash command name
        description: 'Replies with polo.', //the slash command description
    })

    commands?.create({ //create a command
        name: 'add', //the slash command name
        description: 'Performs addition.', //the slash command description
        options: [ //these will be what you can use within this command
            {
                name: 'number1', //name must not contain spaces
                description: 'The 1st number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: 'number2',
                description: 'The 2nd number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
    })

    commands?.create({ //create a command
        name: 'subtract', //the slash command name
        description: 'Performs subtraction.', //the slash command description
        options: [ //these will be what you can use within this command
            {
                name: 'number1', //name must not contain spaces
                description: 'The 1st number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: 'number2',
                description: 'The 2nd number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
    })

    commands?.create({ //create a command
        name: 'multiply', //the slash command name
        description: 'Performs multiplication.', //the slash command description
        options: [ //these will be what you can use within this command
            {
                name: 'number1', //name must not contain spaces
                description: 'The 1st number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: 'number2',
                description: 'The 2nd number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
    })

    commands?.create({ //create a command
        name: 'divide', //the slash command name
        description: 'Performs division.', //the slash command description
        options: [ //these will be what you can use within this command
            {
                name: 'number1', //name must not contain spaces
                description: 'The 1st number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: 'number2',
                description: 'The 2nd number.',
                required: true, //need this number
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ],
    })
})

client.on('interactionCreate', async (interaction) => {  //create an interaction that occurs when the command "marco" is triggered
    if (!interaction.isCommand()) { //if the message is not a slash command, the bot doesn't respond
        return
    }
    const { commandName, options } = interaction //else if there is command in the message then run the interaction
    if (commandName === 'marco'){ //if the command marco is used:
        interaction.reply({
            content: 'polo', //replies with polo
            ephemeral: false, //don't make it a hidden message, if this is true then only the caller of the command will be able to see it
        })
    } else if (commandName === 'add') { //create an interaction for our add command
        const number1 = options.getNumber('number1') || 0 //make number 1 equal the inputted number 1 or 0 if it's null
        const number2 = options.getNumber('number2') || 0 //make number 2 equal the inputted number 2 or 0 if it's null
        interaction.reply({
            content: 'The sum of ' + number1 + ' and ' + number2 + ` is equal to ${number1 + number2}`, //Send response, 
            ephemeral: false,                                                   //${} is called a template literal and allows for string interpolation (adding variables within strings)
        })                                                                      //You MUST use a backtick instead of single quotation for template literal to work
    } else if (commandName === 'subtract') { //create an interaction for our add command
        const number1 = options.getNumber('number1') || 0 //make number 1 equal the inputted number 1 or 0 if it's null
        const number2 = options.getNumber('number2') || 0 //make number 2 equal the inputted number 2 or 0 if it's null
        interaction.reply({
            content: 'The difference of ' + number1 + ' minus ' + number2 + ` is equal to ${number1 - number2}`,  
            ephemeral: false,                                                   
        })
    } else if (commandName === 'multiply') { //create an interaction for our add command
        const number1 = options.getNumber('number1') || 0 //make number 1 equal the inputted number 1 or 0 if it's null
        const number2 = options.getNumber('number2') || 0 //make number 2 equal the inputted number 2 or 0 if it's null
        interaction.reply({
            content: 'The product of ' + number1 + ' and ' + number2 + ` is equal to ${number1 * number2}`,  
            ephemeral: false,                                                   
        })
    } else if (commandName === 'divide') { //create an interaction for our add command
        const number1 = options.getNumber('number1') || 0 //make number 1 equal the inputted number 1 or 0 if it's null
        const number2 = options.getNumber('number2') || 0 //make number 2 equal the inputted number 2 or 0 if it's null
        interaction.reply({
            content: 'The quotient of ' + number1 + ' over ' + number2 + ` is equal to ${number1 / number2}`,  
            ephemeral: false,                                                   
        })
    }
})

client.on('messageCreate', (message) => {  //writes a message
    if (message.content === 'marco'){ //if there a message in a server that says 'marco'
        message.reply({ //respond to that message with the contents 'polo'
            content: 'polo',
        })
    } else if (message.channel.name === 'count'){ //bot will only respond if the channel the message is sent in is call count
        let number = parseInt(message.content); //create a new number as the message content
        if (message.content > 0) { //must be larger than 0
            if (LastSender !== message.author.id) { //the same user can't count twice in a row
                if (number == Counter + 1) { //the number must be one above the counter
                    LastSender = message.author.id; 
                    Counter++; //increment the counter
                    message.react('☑️');
                } else { //else if it wasn't the correct number
                    Counter = 0; //reset counter
                    LastSender = null; //reset last sender
                    message.react('🚫');
                    message.channel.send(`<@!${message.author.id}> You've ruined the count. Try again.`) //message response
                }
            } else { //else if the same person counted twice in a row
                Counter = 0; //reset counter
                LastSender = null; //reset last sender
                message.react('🚫');
                message.channel.send(`<@!${message.author.id}> You can't count two numbers in a row.`) //message response
            }
        }
    }
})

client.login(process.env.TOKEN) //puts our bot online