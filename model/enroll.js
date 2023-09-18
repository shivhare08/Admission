const mongoose = require('mongoose')

const EnrollSchema = new mongoose.Schema({
    
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

    address :{
        type:String,
        required:true,
    },

    gender :{
        type:String,
        required:true,
    },

    college :{
        type:String,
        required:true,
    },

    branch :{
        type:String,
        required:true,
    },

    course :{
        type:String,
        required:true,
    },

    userid:{
        type:String,
    }

},{timestamps:true})

const EnrollModel = mongoose.model('APenroll',EnrollSchema)
module.exports = EnrollModel