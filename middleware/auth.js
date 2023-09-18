const jwt = require('jsonwebtoken')
const AdminModel = require('../model/admin')

const admin_auth = async(req,res,next)=>{
    try{
        // console.log('hlo bhai')
        const {token} = req.cookies
        if(!token){
            req.flash('error','Unauthorized user, Please Login!')
            res.redirect('/')
        }else{
            //verify token ke andr id bhi h admin ki
            const verify_token = jwt.verify(token,'shashankismylife08')
            //data ko uthane ke liye
            const data = await AdminModel.findOne({ _id: verify_token.dataid})
            // console.log(data)
            req.admin = data
            // console.log(req.admin)
            next()
        }

    }catch(error){
        console.log(error)
    }
}


module.exports = admin_auth