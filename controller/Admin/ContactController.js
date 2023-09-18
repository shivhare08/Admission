const ContactModel = require('../../model/contact')

class ContactController{
    static contactdata = async(req,res)=>{
        try{
            const {name , email , message , reason} = req.body
            const data = await ContactModel({
                name:name,
                email:email,
                reason:reason,
                message:message,
            })
            await data.save()
            req.flash('success','Your Message has been sent successfully')
            res.redirect('/contact')
        }catch(error){
            console.log(error)
        }
    }
}


module.exports = ContactController