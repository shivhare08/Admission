const express = require('express')
const router = express.Router()
const AdminController = require('../controller/Admin/AdminController')
const FrontController = require('../controller/FrontController')
const ContactController = require('../controller/Admin/ContactController')
const EnrollController = require('../controller/Admin/EnrollController')
const auth = require('../middleware/auth')

//frontcontroller
router.get('/dashboard',auth,FrontController.home)
router.get('/about',auth,FrontController.about)
router.get('/showall',auth,FrontController.showall)
router.get('/enroll',auth,FrontController.enrollpage)
router.get('/contact',auth,FrontController.contact)
router.get('/view/:id',auth,FrontController.viewenrolled)
router.post('/update/:id',auth,FrontController.update)

//admincontroller
router.get('/',AdminController.login)
router.get('/admin/registration',AdminController.registration)
router.post('/admin/fillform',AdminController.fillform)
router.post('/admin/loginverify',AdminController.loginverify)
router.get('/logout',auth,AdminController.logout)

//enrollcontroller
router.post('/Enroll/Model',EnrollController.enroll)

//contactcontroller
router.post('/admin/contact',ContactController.contactdata)




module.exports = router