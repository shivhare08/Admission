const express = require('express')
const app = express()
const port = 1234
const router = require('./route/web')
const connectDB = require('./db/connectDB')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')

//=======cookies========\\
app.use(cookieParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//=======flash message=========\\
app.use(flash());

//=====session message==========\\
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));

//for req.body and more
app.use(express.urlencoded({extended:false}))

app.use('/',router)


//Public file
app.use(express.static('public'))

//mongodb
connectDB();

//ejs
app.set('viewengine','ejs')

//server
app.listen(port,(req,res)=>{
    console.log(`your localhost:${port}`)
})