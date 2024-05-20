module.exports = {

  name: 'levelingpet',
  description: 'Leveling pet',
  // devOnly: Boolean,
  // testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply(`Memahami Exp pada Pet

    ( Pet memperoleh bonus EXP sebesar (Affinity x 10). Yaitu, pada affinity 100%, ia mendapat 1000% EXP ) 
    
  
    ( Bonus 10%, 30%, dan 50% EXP dari makanan dikalikan dengan bonus afinitas, berarti Anda mendapat 1500% EXP ketika memiliki 50% bonus EXP dan 100% afinitas ) 
    
  
    ( Bonus 10%, 30%, dan 50% EXP dari makanan dikalikan dengan bonus afinitas, berarti Anda mendapat 1500% EXP ketika memiliki 50% bonus EXP dan 100% afinitas )
    
  
    ( Gem juga meningkatkan Exp pada Pet tergantung berapa %Exp pada Gem, Misalnya pada Boss dengan Exp 10K ditambah dengan Gem +100%Exp dan Affinity 100%, Maka Pet Anda akan mendapatkan 200k Exp )
    
  
    DAFTAR PET LEVELING
  
    LVL 1-40 Norma Bertopeng
  
    LVL 40-46 Keras Bertopeng
  
    LVL 46-72 NM Bertopeng
  
    LVL 72-95 Ulti Bertopeng
  
    LVL 95-102 Cerberus NM
  
    LVL 102-160 Cerberus Ulti
  
    LVL 160 - CAP Venena ulti`);
  },
};