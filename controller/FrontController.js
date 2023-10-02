const EnrollModel = require('../model/enroll')
const AdminModel = require('../model/admin')

class FrontController{
    static home = async (req,res)=>{
        try{
            const options = { weekday : 'long', year : 'numeric', month : 'long', day : 'numeric' };
            const today = new Date();
            const day = today.toLocaleDateString("en-US", options); 
            const {name , _id , email} = req.admin
            const BCA = await EnrollModel.findOne({course : 'BCA'})
            const MCA = await EnrollModel.findOne({course : 'MCA'})
            const BTECH = await EnrollModel.findOne({course : 'B.Tech'})
            const MTECH = await EnrollModel.findOne({course : 'M.Tech'})
            res.render('front/home.ejs',{d:day , n:name , e:email , id:_id , b:BCA , m:MCA , bt:BTECH , mt:MTECH})
        }catch(error){
            console.log(error)
        }
    }

    static about = async (req,res)=>{
        try{
            const {name , _id , email} = req.admin
            const totalusers = await AdminModel.find().sort({_id:-1}).limit(5)
            res.render('front/about.ejs',{tu : totalusers})
        }catch(error){
            console.log(error)
        }
    }

    static showall = async (req,res)=>{
        try{
            const {name , _id , email} = req.admin
            const showalluser = await AdminModel.find()
            res.render('front/showall.ejs',{ sa : showalluser})
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
            const options = { weekday : 'long', year : 'numeric', month : 'long', day : 'numeric' };
            const today = new Date();
            const day = today.toLocaleDateString("en-US", options); 
            const {name , _id , email} = req.admin
            res.render('front/contact.ejs',{d : day , message : req.flash('success')})
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