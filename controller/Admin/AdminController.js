const AdminModel = require('../../model/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AdminController{
    static login = async (req,res)=>{
        try{
            const options = { weekday : 'long', year : 'numeric', month : 'long', day : 'numeric' };
            const today = new Date();
            const day = today.toLocaleDateString("en-US", options); 
            res.render('admin/login.ejs',{d:day , message : req.flash('success'),errmsg : req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }

    static registration = async (req,res)=>{
        try{
            res.render('admin/registration.ejs',{message : req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }

    static fillform = async (req,res)=>{
        try{
            const {name,phone,email,password,conpassword} = req.body
            if(name && phone && password && email && conpassword){
                const data = await AdminModel.findOne({email:email})
                if(data){
                    req.flash('error','email already exist')
                    res.redirect('/admin/registration')
                }else{
                    if(password.length > 6 ){
                        if(password == conpassword){
                            try{
                                const hashpassword = await bcrypt.hash(password,10)
                                const result = await AdminModel({
                                name:name,
                                email:email,
                                phone:phone,
                                password:hashpassword,
                                })
                                await result.save()
                                req.flash('success','Registeration successfully login here')
                                res.redirect('/')
                            }catch(error){
                                console.log(error)
                            }
                        }else{
                            req.flash('error','Password and confirm password are not match')
                            res.redirect('/admin/registration')
                        }
                    }else{
                        req.flash('error','password must have more than 6 character')
                        res.redirect('/admin/registration')
                    }
                }
            }else{
                req.flash('error','All feilds are required')
                res.redirect('/admin/registration')
            }
        }catch(error){
            console.log(error)
        }
    }

    static loginverify = async(req,res)=>{
        try{
            const {email , phone , password} = req.body
            if(email && password){
                const data = await AdminModel.findOne({email:email})
                if(data != null){
                    const match = await bcrypt.compare(password,data.password)
                    if((data.email == email) && match){
                        const token = jwt.sign({ dataid : data._id },'shashankismylife08')
                        // console.log(token)
                        res.cookie('token',token)
                        res.redirect('/dashboard')
                    }else{
                        req.flash('error','invalid admin')
                        res.redirect('/')
                    }
                }else{
                    req.flash('error','You are not exist')
                    res.redirect('/')
                }
            }else{
                req.flash('error','All the feilds are required')
                res.redirect('/')
            }
        }catch(error){
            console.log(error)
        }
    }

    static logout = async (req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/')
        }catch(error){
            console.log(error)
        }
    }

}

module.exports = AdminController