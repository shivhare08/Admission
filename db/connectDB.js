const mongoose = require('mongoose')
// const local_url = 'mongodb://127.0.0.1:27017/AdissionPortal'
const live_url = 'mongodb+srv://shivhares2002:everything08@cluster0.pux2scw.mongodb.net/admissionportal?retryWrites=true&w=majority'


const connectDB =()=>{
    return mongoose.connect(live_url)

    .then(()=>{
        console.log('connection succesfully')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB