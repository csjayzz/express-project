const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user 
//route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //this gonna help us find if there is a user with that email address, email needs to be  passed as an object
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }//now if we dont find it to be existing user we create new user
    //now before accepting the username,password and email from the client we need to hash our pass we cant store raw password in our db 
    //we are going to use library called bcrypt to hash
   //so first we need to create hash password and then first we need to pass our raw pass then provide the solved rounds. here 10 is the solved rounds


    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    //console.log(hashedPassword);$2b$10$slDvZSIZGziYBhJocUDIpO/TTRWZmla0UnJDYbkXhmghiJd60VqjO upon log we get something like this 

    // we store this in our database to have password security

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })

    console.log(`User created ${user}`);
    if(user){
      res.status(201).json({_id: user.id, email:user.email})  
    }else{
        res.status(400);
        throw new Error('user data is not not valid ');
    }
    res.json({message: "Register the user"});
});

//@desc login a user 
//route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user = await User.findOne({email});
//compare password with hashedpassword
if(user&&(await bcrypt.compare(password, user.password))){
    const accessToken = jwt.sign({
        //payload
        user:{
            username : user.username,
            email: user.email,
            id: user.id,
        }
       } ,
       //access token secret defined in env
       process.env.ACCESS_TOKEN_SECRET,
       //TOKEN expiration time
       { expiresIn : "15m" }
    );
    res.status(200).json({accessToken});
    //now with we can get our accesstoken and with that we can access all our private routes
}else{
    res.status(401);
    throw new Error("login credentials are not valid")
}
    res.json({message : "login a user"});
});

//@desc curernt a user 
//route POST /api/users/current
//@access private -> only the logged in user can see the current user
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message : "Currrent user information"});
});

module.exports = {registerUser,loginUser,currentUser};