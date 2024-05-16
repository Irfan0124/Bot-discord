const {Schema,model}=require('mongoose');

const levelSchema= new Schema({
    userId:{
        type:'string',
        requred:true,
    },
    guildId:{
        type:'string',
        requred:true,
    },
    xp:{
        type:'number',
        default:0,
    },
    level:{
        type:'number',
        default:0,
    },
});

module.exports =model('Level', levelSchema);