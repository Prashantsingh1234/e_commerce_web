const express  = require('express');


const app      = express();
const path = require('path');
const mongoose  = require('mongoose');
const SeedDB = require('./seed')
const ejsMAte = require('ejs-mate')
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy=require("passport-local");
const User = require('./Models/User');
require('dotenv').config();

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

const { date } = require('joi');

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("Connected to MongoDB")})
.catch(err => console.error(err));


let configSession = {
    secret : 'secret cat',
    resave : false  ,
    saveUninitialized:true,
    cookie:{
        httpOnly : true,
        expires : Date.now() + 24*7*60*60*1000, // 7 day day
        maxAge : 24*7*60*60*1000
       }
}


app.engine('ejs',ejsMAte)
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
// static -> harr req -> middleware
app.use(express.static(path.join(__dirname, 'public') ));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success=req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//  PASSPORT MIDDLEWARE
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

app.use(productRoutes); //har incoming request k liye path change kia jaye 
app.use(reviewRoutes); ///har incoming request k liye path change kia jaye 
app.use(authRoutes); //har incoming request k liye path change kia jaye 
app.use(cartRoutes); //har incoming request k liye path change kia jaye 



// SeedDB();
//console.log('MONGODB_URI:', process.env.MONGODB_URI);



app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})




