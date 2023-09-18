const EnrollModel = require('../../model/enroll')
const auth = require('../../middleware/auth')

class EnrollController{
    static enroll = async(req,res)=>{
        try{
            // const {name , email , phone , address , gender , college , branch , course } = req.body
            // const id = req.admin
            const data = new EnrollModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                gender:req.body.gender,
                college:req.body.college,
                branch:req.body.branch,
                course:req.body.course,
                // userid:_id
            })
            // console.log(data)
            await data.save()
            res.redirect('/enroll')
        }catch(error){
            console.log(error)
        }
    }
}


module.exports = EnrollController