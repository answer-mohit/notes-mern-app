require('dotenv').config();
const router=require('express').Router();
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

//user signup
router.post('/',async(req,res)=>{
    try {
        const {name,email,password,passwordVerify}=req.body;

        //validation in server 

        if(!name || !email || !password || !passwordVerify){
    console.log('fields are required');
    return res.status(400).send('all fields are required');

}

if(password!==passwordVerify){
    return res.status(400).send('password should be same');

}

//hash the password

 const salt = await bcrypt.genSalt();
 const passwordHash=await bcrypt.hash(password,salt);

//save the user details

const newUser=new userModel({
    name,
    email,
    password:passwordHash
});

const saveUser=await newUser.save();

//create token
const token=jwt.sign({user:saveUser._id},process.env.SECRET_KEY);

res.status(201).cookie("token",token,{
    httpOnly:true,
expire: 360000 + Date.now()    
}).send('user details is saved');
console.log(saveUser);
} catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
});

//user login

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existedUser=await userModel.findOne({email});

        //verify the user password

        const passwordConfirm=await bcrypt.compare(password,existedUser.password);

if(!passwordConfirm){
    return res.status(401).send('user details invalid');
}
//create the token

const token=jwt.sign({user:existedUser._id},process.env.SECRET_KEY);

res.status(201).cookie("token",token,{
    httpOnly:true,
    expire:360000+Date.now()
}).send('user login');


    } catch (error) {
        console.log(error);
        res.status(401).json({message:'invalid user details'});
        // console.log(res);
    }
});
//logout 

router.get('/logout',(req,res)=>{
        res.clearCookie('token');
        res.send('cookie token cleared');
     
})



//logged in

router.get('/loggedin',(req,res)=>{
    const {token}=req.cookies;
    console.log(token);
    if(!token){
        return res.status(401).send(false);
    }
    res.status(201).send(true);

});




module.exports=router;