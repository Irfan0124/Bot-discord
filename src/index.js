require('dotenv').config();
const { Client, GatewayIntentBits, REST,ActivityType } = require('discord.js');
const eventHandler = require('./handler/eventHandler');
const mongoose = require('mongoose');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
	],
});

client.on('messageCreate',(msg)=>{
    if (msg.author.bot) {
        return;
    } else if (msg.content==="kenalan beb") {
        msg.reply("@everyone hello semua!,kenalin aku pelayan  di server ini^^");
        Image_url='https://cdn.donmai.us/original/92/07/9207bf63c8eecae72dcfdcddf4d140ef.png'
       }
     
	  if (msg.content.includes("hello")&&msg.content.includes("world")) {
		msg.reply(`Hey ${msg.author}, Apa kabar!,tukang ngoding`);
		
	} else if (msg.content.includes("hello")) {
  msg.reply({
    content: `Hey ${msg.author}, Apa kabar!`,
    files: [{ attachment: './image/hello.png'}]
  });
}
	
	
	else if (msg.content==="selamat pagi") {
        msg.reply("pagi master!");
    }else if (msg.content==="selamat siang") {
        msg.reply("siang master!");
    }
	
	
	else if (msg.content==="selamat malam") {
        msg.reply("malam master!");
    }else if (msg.content==="pinter kamu beb") {
        if (msg.author.id === '717576420037230623'){
            msg.reply("makasih  sayang :3");
        }else{msg.reply("Terimakasih!");}
        
    } 
    if (msg.content===("NSFW")) {
      if (msg.author.id==='717576420037230623'){
        msg.reply({
          content: `Si-silahkan master...`,
          files: [{ attachment: './image/sus.jpg'}]
        });
      }else{
        msg.reply({
          content: `Hey ${msg.author}, Mau ngapain!,@everyone ada yg cabul!!!!`,
          files: [{ attachment: './image/sus1.jpg'}]
        });
      }
}
	if (msg.content ==="halo beb") {
		if (msg.author.id === '717576420037230623') {
		 msg.reply("halo juga beb");
		}else{
		 msg.reply("maaf jangan so deket....");
		}
	 }
});
client.on('ready', () => {
  client.user.setPresence({
    status: 'online', // You can use "online", "idle", "dnd", or "invisible"
    activities: [{
      name: 'with my master', // The status message
      type: ActivityType.Playing,// You can use "Playing", "Streaming", "Listening", "Watching", or "Competing"
    }],
  });
  console.log(`Logged in as ${client.user.tag}!`);
});
(async()=>{
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  console.log("connect to database");
  eventHandler(client);
  client.login(process.env.TOKEN);
  } catch (error) {
    console.log(error);
  }
}

)();

