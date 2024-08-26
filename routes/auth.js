const express = require('express');
const User = require('../Models/User');
const passport = require('passport');
 const router = express.Router() //mini instance

 // get the form to signup the user
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

//actually  registering a new user in the database
router.post('/register', async(req, res) => {
    try{

        let {email,password,username,role}= req.body; 
         const user = new User({email,username,role})
          //hashing password before saving it into the database
          const newUser = await User.register(user,password)
        //   console.log(newUser);
        //   res.redirect('/login')
           req.login(newUser,function(err){
            if(err){return next(err)};
            req.flash('success','you are registerd successfully')
            return res.redirect('/products')
           })
    }catch (error) {
        req.flash('error',error.message)
       return  res.redirect('/register')
        
      }
})

//show form of login
router.get('/login',(req,res)=>{
    res.render('auth/login');
})

// to actually logged in the user in the db
router.post("/login",
passport.authenticate('local', { 
    failureRedirect: '/login',
    failureMessage : true
 }),
 (req,res)=> {
    let {username} = req.body;
    req.flash('success',`Welcome Back ${username}`);
    res.redirect('/products');
})
// LOGOUT
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
    }
   req.flash('success','Logged Out Successfully!')
    res.redirect('/login')
})
    




module.exports = router;