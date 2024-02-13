const mongoose=require('mongoose');

const urlSChema=new mongoose.Schema({
    shortId:{
        required: true,
        unique: true,
        type: String
    },
    redirectURL:{
        type: String,
        required: true
    },
    visitHistory:[{
        timestamp: {type: Number}
    }]
}, {timestamps:true});

const URL=mongoose.model("url", urlSChema);
module.exports=URL;