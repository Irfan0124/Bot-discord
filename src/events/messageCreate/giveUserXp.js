const { Client, Message } = require("discord.js");
const Level=require("../../models/Level");
const calculateLevelXp=require("../../utils/calculateLevelXp");
const cooldown= new Set();
function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
/** 
 * @param {Client}client
 *  @param {Message}message
*/

module.exports=async(client,message)=>{
if(!message.inGuild()||message.author.bot||cooldown.has(message.author.id)) return;
const xpToGive=getRandomXp(1,10);
const query={
    userId:message.author.id,
    guildId:message.guild.id
}
try {
    const level=await Level.findOne(query);
    if(level){
        level.xp+=xpToGive;
        if(level.xp>=calculateLevelXp(level.level)){
            level.exp=0;
            level.level += 1;
            message.channel.send(`${message.member}Selamat penggunjung kamu sudah naik ke level
            ${level.level}!!!!!!!!`);
        }
        await level.save().catch((err)=>{
            console.log(err);
            return;
        });
        cooldown.add(message.author.id);
        setTimeout(()=>{
        cooldown.delete(message.author.id);
        },60000);
        //if (!level.)
    }else{
//create a new level
const newLevel= new Level({
    userId: message.author.id,
    guildId: message.guild.id,
    xp:xpToGive,
});
await newLevel.save();
cooldown.add(message.author.id);
        setTimeout(()=>{
        cooldown.delete(message.author.id);
        },60000);
    }
   
} catch (error) {
    console.log(error);
}

}