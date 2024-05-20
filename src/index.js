require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const AutoTimeout = require('./models/AutoTimeout');
const eventHandler = require('./handler/eventHandler');

const badwords = ['ajg', 'kontol', 'memek', 'asw'];
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;

    const now = new Date();
    const timeoutDuration = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

    // Check for bad words
    if (badwords.some(word => msg.content.includes(word))) {
        let userRecord = await AutoTimeout.findOne({ userId: msg.author.id });

        if (!userRecord) {
            userRecord = new AutoTimeout({ userId: msg.author.id });
        }

        if (userRecord.timeout && now < userRecord.timeout) {
            msg.reply('Seharusnya kamu masih tidak boleh berbicara seperti itu!!');
            return;
        }

        userRecord.infractions += 1;

        if (userRecord.infractions >= 3) {
            userRecord.timeout = new Date(now.getTime() + timeoutDuration);
            userRecord.infractions = 0; // Reset infractions after timeout

            msg.reply('Kamu sudah di timeout untuk 1 jam kedepan!!!!');
            const member = msg.guild.members.cache.get(msg.author.id);
            if (member) {
                member.timeout(timeoutDuration, 'Repeated use of bad language');
            }
        } else {
            msg.reply('Maaf tuan tolong di jaga bahasanya atau saya bonk!!!');
        }

        await userRecord.save();
    }

    // Other message handling logic
    switch (msg.content) {
        case 'kenalan beb':
            msg.reply("@everyone hello semua!, kenalin aku pelayan di server ini^^");
            break;
        case 'selamat pagi':
            msg.reply("pagi master!");
            break;
        case 'selamat siang':
            msg.reply("siang master!");
            break;
        case 'selamat malam':
            msg.reply("malam master!");
            break;
        case 'pinter kamu beb':
            if (msg.author.id === '717576420037230623') {
                msg.reply("makasih sayang :3");
            } else {
                msg.reply("Terimakasih!");
            }
            break;
        case 'NSFW':
            if (msg.author.id === '717576420037230623') {
                msg.reply({
                    content: `Si-silahkan master...`,
                    files: [{ attachment: './image/sus.jpg' }]
                });
            } else {
                msg.reply({
                    content: `Hey ${msg.author}, Mau ngapain!, @everyone ada yg cabul!!!!`,
                    files: [{ attachment: './image/sus1.jpg' }]
                });
            }
            break;
        case 'halo beb':
            if (msg.author.id === '717576420037230623') {
                msg.reply("halo juga beb");
            } else {
                msg.reply("maaf jangan so deket....");
            }
            break;
    }  
    
    
    if (msg.content === "halo beb") {
        if (msg.author.id === '717576420037230623') {
            msg.reply("halo juga beb");
        } else {
            msg.reply("maaf jangan so deket....");
        }
    }
});

client.on('ready', () => {
    client.user.setPresence({
        status: 'online',
        activities: [{
            name: 'with my master',
            type: ActivityType.Playing,
        }],
    });
    console.log(`Logged in as ${client.user.tag}!`);
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
        eventHandler(client);
        client.login(process.env.TOKEN);
    } catch (error) {
        console.error("Error connecting to the database or logging in the bot:", error);
    }
})();
