const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema({
    cn:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    bn:{
        type:String,
        required:true
    },

    cacStatus:{
        type:String,
        required:true
    },

    job:{
        type:String,
        required:true
    },

    staff:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    url:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    dateRegistered:{
        type:Date,
        default:Date.now()
    },

    mail:{
        type:String,
    }
})

module.exports = new mongoose.model('artisan', artisanSchema)