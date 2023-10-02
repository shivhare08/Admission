const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },

    email :{
        type:String,
        required:true,
    },

    phone :{
        type:String,
        required:true,
    },

    password :{
        type:String,
        required:true,
    },
},{timestamps:true})

const AdminModel = mongoose.model('APregister',AdminSchema)
module.exports = AdminModel