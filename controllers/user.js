const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../service/auth');

async function handleUserSignUp(req,res){
    const {name, email, password}=req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("login");
}

async function handleUserLogin(req,res){
    const Email=req.body.email; Password=req.body.password;
   const user= await User.findOne({
        email:Email,
        password: Password
    });
    if(!user) {return res.render('signup',({
    error: 'Invalid Username or Password'}));}
    const sessionId=uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect('/');
}

module.exports={handleUserSignUp, handleUserLogin};