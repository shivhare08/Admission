const EnrollModel = require('../model/enroll')

class FrontController{
    static home = async (req,res)=>{
        try{
            const {name , _id , email} = req.admin
            const BCA = await EnrollModel.findOne({course : 'BCA'})
            const MCA = await EnrollModel.findOne({course : 'MCA'})
            const BTECH = await EnrollModel.findOne({course : 'B.Tech'})
            const MTECH = await EnrollModel.findOne({course : 'M.Tech'})
            res.render('front/home.ejs',{n:name , e:email , id:_id , b:BCA , m:MCA , bt:BTECH , mt:MTECH})
        }catch(error){
            console.log(error)
        }
    }

    static about = async (req,res)=>{
        try{
            const {name , _id , email} = req.admin
            res.render('front/about.ejs')
        }catch(error){
            console.log(error)
        }
    }

    static enrollpage = async (req,res)=>{
        try{
            const {_id} = req.admin
            const data = await EnrollModel.find({userid:_id}) //user_id model ki feild h {userid:_id}
            // console.log(_id)
            res.render('front/enroll.ejs',{d:data,message:req.flash('done')})
        }catch(error){
            console.log(error)
        }
    }

    static contact = async (req,res)=>{
        try{
            const {name , _id , email} = req.admin
            res.render('front/contact.ejs',{message : req.flash('success')})
        }catch(error){
            console.log(error)
        }
    }

    static viewenrolled = async (req,res)=>{
        try{
            const data = await EnrollModel.findById(req.params.id)
            res.render('front/view.ejs',{v:data})
        }catch(error){
            console.log(error)
        }
    }

    static update = async (req,res)=>{
        try{
            const {name , email , phone , address , gender , college , branch ,course} = req.body
            const courseupdate = await EnrollModel.findByIdAndUpdate(req.params.id,{
                name:name,
                email:email,
                phone:phone,
                address:address,
                gender:gender,
                college:college,
                branch:branch,
                course:course,
        })
        await courseupdate.save() 
        req.flash('done','Form has been updated')
        res.redirect('/enroll')
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = FrontController