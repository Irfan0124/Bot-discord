require('dotenv').config();
const { REST, Routes, Options,ApplicationCommandOptionType  } = require('discord.js');
const commands = [
   {
    name:'add',
    description:'add two numbers',
    options:[
        {
            name:'first-number',
            description:'first number',
            type:ApplicationCommandOptionType.Number,
           required:true,
        },
        {
            name:'second-number',
            description:'second number',
            type:ApplicationCommandOptionType.Number,
            required:true,
        },
    ]
   },
   {
    name:'lvling',
    description:'pilih lvlnya',
    options:[
        {
            name:'lvl-player',
            description:'player lvl',
            type:ApplicationCommandOptionType.Number,
           required:true,
        },
       
    ]
   },
];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('Slash commands registered successfully.');
    } catch (error) {
        console.log(error);
    }
})();