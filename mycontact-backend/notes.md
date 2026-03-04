#the dotenv package gives access to fetch the value of port from env file with the help of process module
const dotenv = require('dotenv');
dotenv.config();

#if we need to test the api we need http client like postman or thunder client or insomnia

app.get("/api/contacts",(req,res)=>{
    res.send("Get the contacts")
});

upon this the thunder client will send a get request to the url http://localhost:5000/api/contacts and the server will respond with "Get the contacts" message

if we want to send the data in json format then we can use res.json() method instead of res.send() method

app.get("/api/contacts",(req,res)=>{
    //in json the field are as an object with key value pair
    res.json({
        name:"jayesh",
        email:"jay@1mail.com"}) });

        this will send the response in json format as 
        {
            "name":"jayesh",
            "email":"jay@1mail.com"
        }

        to add status code in the response we can use res.status().send/json method before sending the response

        routes are the endpoints which are used to access the data from the server and they are defined in the server.js file

        .use() is middleware funct

        controller is the function which is used to handle the request and response of the route and it is defined in the controller file

        after setting up controllers we are going is to accept the body of the request and for that we need to use express.json() middleware function which is used to parse the json data from the request body and make it available in req.body object

        at the first the req.body will be undefined 
        whenever we want to accept some data from the client we need to use body parser so that we can parse the stream of data taht we are receiving from the client and make it available in req.body object and for that we need to use a middleware express.json 

        //app.use(express.json()) is used to parse the json data from the request body and make it available in req.body object used in the server.js file

        const createContact = (req,res) => {

    console.log("the req body is", req.body);
    //error handling if req.body is empty 
    ///1.destructure
    const{name,email,phone} = req.body;
    if(!name || !email || !phone ){
        res.status(400);
        throw new Error("All fields are manatory");
    }
    res.status(201).json({message : `create new contact`})
    }

now this gives the error message in html format to change that we need to create a custom middeleware to handle the error and send the error message in json format

    now this gives the error message in html format and to handle this we need to use express-async-handler package which is used to handle the error in async functions and it will send the error message in json format

//error handling middleware function

    const errorHandler = (err,req,res,next) =>{
const statusCode = res.StatusCode ? res.statusCode : 500;
res.json({message : err.message, stackTrace: err.stack });
};

err.stack gives the stack trace of the error which is useful for debugging the error and it will be sent in the response in json format

//this shows the error message in json format and not in html also shows the stackTrace now if u watn to make a conditon to display the err.stack on the development/dev env but not on the production side you can the make that condition 
//in this case ill need to pass more information such as (title) coz there will be different err

const errorHandler = (err,req,res,next) =>{
const statusCode = res.statusCode ? res.statusCode : 500;
switch (statusCode) {
    case 400 :
        res.json({ title : "Validation error" ,message : err.message, stackTrace: err.stack });
   
        break;
    case 404: 
        res.json({ title : "Not found" ,message : err.message, stackTrace: err.stack });

    default:
        break;
    }
};


///now i am going to create a constant file for managing the error codes


exports.constants = {
    VALIDATION_ERROR:400 ,
    UNAUTHORIZED: 401,
    FORBIDDEN : 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
}
//NOW I HAVE DIFF HTTP ERROR METHODS FOR THE CLIENT AND I CAN MAKE USE OFIT IN THE ERR HANDLER

const {constants} = require("../constants");
const errorHandler = (err,req,res,next) =>{
const statusCode = res.statusCode ? res.statusCode : 500;
switch (statusCode) {
    case constants.VALIDATION_ERROR :
        res.json({ title : "Validation error" ,message : err.message, stackTrace: err.stack });
        break;

    case constants.NOT_FOUND: 
        res.json({ title : "Not found" ,message : err.message, stackTrace: err.stack });
        break;

    case constants.FORBIDDEN :
        res.json({ title : "forbidden error" ,message : err.message, stackTrace: err.stack });
        break;

    case constants.UNAUTHORIZED :
        res.json({ title : "Unauthorized error" ,message : err.message, stackTrace: err.stack });
        break;

    case constants.SERVER_ERROR :
        res.json({ title : "server error" ,message : err.message, stackTrace: err.stack });
        break;
         
       default:
        console.log("NO Error, All Good")
        break;
    }
};


//this shows the error message in json format and not in html also shows the stackTrace now if u watn to make a conditon to display the err.stack on the development/dev env but not on the production side you can the make that condition 
//in this case ill need to pass more information such as (title) coz there will be different err

module.exports = {errorHandler}

///so we are going to working with mongodb as our database and mongoose as our ODM (object data modeling) 

//imp ; so whenevr we interact with the mongodb we always get a promise and to handle that promise we can use async await or then catch method but in this case we are going to use async await method and for that we need to use express-async-handler package which is used to handle the error in async functions and it will send the error message in json format

1. install npm i express-async-handler
2. import the package in the controller file and wrap the async function with the asyncHandler function
const asyncHandler = require("express-async-handler");
3. now we dont need the try catch block to handle the error in async functions and we can directly throw the error and it will be handled by the error handling middleware function and it will send the error message in json format


const createContact = asyncHandler(async (req,res) => {

    console.log("the req body is", req.body);
    //error handling if req.body is empty 
    ///1.destructure
    const{name,email,phone} = req.body;
    if(!name || !email || !phone ){
        res.status(400);
        throw new Error("All fields are manatory");
    }
    res.status(201).json({message : `create new contact`})
    })
   
   the mongodb setup is done in the server.js file and we are using the mongoose package to connect to the mongodb and we are using the connection string to connect to the mongodb and we are using the dotenv package to fetch the value of the connection string from the env file and we are using the process module to access the value of the connection string from the env file
    mongodb+srv://admin:j1a2y3e4s5h6@jayeshcluster.s7ge5yt.mongodb.net/?appName=jayeshCluster

dbConnection.js :
const mongoose = require("mongoose");
const dbConnect = async () =>{
    try{
       const connect = await mongoose.connect(process.env.CONNECTION_STRING);
       console.log("connection established",
        connect.connection.host,
        connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = {dbConnect};

now that we have connected to the mongodb we need to create a schema for the contact model and for that we need to use the mongoose.Schema class and we need to define the fields and their data types in the schema and then we need to create a model from the schema and export it to use in the controller file

create a new folder models and create a new file contactModel.js and define the schema and model in that file
const mongoose = require("mongoose");
//mongoose object
const contactSchema = mongoose.Schema({
     name:{
        type: String,
        requiured:[true,"Please add the contact name"],
    },
     email:{
        type: String,
        requiured:[true,"Please add the contact email"],
    },
     phone:{
        type: String,
        requiured:[true,"Please add the contact phone number"],
    }
},{
    timestamps : true,
});


module.exports = mongoose.model("Contact",contactSchema);
//Contact is the name of the model

now that we have created the model we can use it in the controller file to perform the CRUD operations on the contact collection in the mongodb and we can use the mongoose methods to perform the CRUD operations such as create, find, findById, findByIdAndUpdate, findByIdAndDelete etc.
///create a contact
const createContact = asyncHandler(async (req,res) => {

    console.log("the req body is", req.body);
    
    ///1.destructure
    const{name,email,phone} = req.body;
    //error handling if req.body is empty 
    if(!name || !email || !phone ){
        res.status(400);
        throw new Error("All fields are manatory");
    }
    //if req.body is not empty then add a contact
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json({message : `created new contact`,contact})
});

//get all contact 
const getContacts = asyncHandler(async (req,res)=> {
    const Contacts = await Contact.find();
    res.status(200).json(Contacts);          
})

//get a single contact by id 
const getcontact = asyncHandler(async (req,res) => {
    const contact = Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

})

//update a contact by id
const updateContact = asyncHandler(async (req,res) => {
    const contact = Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedContact);
})

//delete
const deleteContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(203).json(contact);
});


//now the next part we will do authentication module for that we need to provid some endpoints to the user to register and login they can use the access token to access the protected routes and for that we need to use the jsonwebtoken package to generate the access token and we need to use the bcrypt package to hash the password before storing it in the database and we need to use the express-async-handler package to handle the error in async functions and it will send the error message in json format

1. routing for auth module

in server.js file we need to import the userRoutes and use it as a middleware for the auth routes
app.use("/api/users","./routes/userRoutes");

userRoutes.js 
const express = require("express");
const router = express.Router();

router.post("/register",(req,res)=>{
    res.json({message: "Register the user"});
})
//login endpoint
router.post("/login",(req,res)=>{
    res.json({message: "login the user"});
})
//current endpoint should be a get req
router.get("/current",(req,res)=>{
    res.json({message: "Current user information"});
})

module.exports = router;

2. adding a user controller to handle the request and response of the auth routes and for that we need to create a new file userController.js in the controllers folder and define the functions for register, login and current user information in that file and then we need to export those functions to use in the userRoutes.js file

const asyncHandler = require("express-async-handler");
//@desc Register a user 
//route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    res.json({message: "Register the user"});
});

//@desc login a user 
//route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message : "login a user"});
});

//@desc curernt a user 
//route POST /api/users/current
//@access private -> only the logged in user can see the current user
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message : "Currrent user information"});
});

module.exports = {registerUser,loginUser,currentUser};

3. now the next thing we hve to do is to make the functionality for the resiger for that we first need to create a user model to store the user information in the database and for that we need to use the mongoose package to create a schema and model for the user and then we need to export the model to use in the controller file

const mongoose = require('mongoose');
//mongoose object//model files are for defining schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true,"please add the user name"],
    }
     ,
    email: {
     type : String,
     required: [true,"please the user email"],
     //unique propery make sure there are no duplicate email.
     unique : [true,"email is already taken"]
    },
    password:{
        type:String,
        required:[true,"please enter the user password"]
    },

},{
    timestamps:true,
});


module.exports = mongoose.model("user",userSchema);
//user is the name of the model



now we have created the user model the next thing we can do is to write the functionality for the register user in the userController.js file and for that we need to use the bcrypt package to hash the password before storing it in the database and we need to use the jsonwebtoken package to generate the access token for the user after successful registration and we need to use the express-async-handler package to handle the error in async functions and it will send the error message in json format

1. make user model 
2. import in usercontroller and write the functionality for the register user in the userController.js file
3. for password hashing we need to use the bcrypt package and for that we need to install the package using npm i bcrypt and then we need to import the package in the userController.js file and use the hash method to hash the password before storing it in the database

const User = require("../models/userModel")
const bcrypt = require("bcrypt");
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
        res,status(400);
        throw new Error('user data is not not valid ');
    }
    res.json({message: "Register the user"});
});



now we need to create endpoint for the login functionality so that whenever a user login we get an access token and for that we need to use the bcrypt package to compare the password entered by the user with the hashed password stored in the database and we need to use the jsonwebtoken package to generate the access token for the user after successful login and we need to use the express-async-handler package to handle the error in async functions and it will send the error message in json format

to see jsonwebtoken go to jwt.io and paste the token to see the payload and header information of the token

JWT
Debugger

Get the JWT Handbook for free


EN
JSON Web Token (JWT) Debugger

+
Decode, verify, and generate JSON Web Tokens, which are an open, industry standard RFC 7519 method for representing claims securely between two parties.
Learn more about JWT
See JWT libraries


+
For your protection, all JWT debugging and validation happens in the browser. Be careful where you paste or share JWTs as they can represent credentials that grant access to resources. This site does not store or transmit your JSON Web Tokens outside of the browser.

JWT Decoder
JWT Encoder
Paste a JWT below that you'd like to decode, validate, and verify.
Generate example
Encoded value

Enable auto-focus
JSON Web Token (JWT)
Copy
Clear
Valid JWT

Signature Verified
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
Decoded Header
JSON
Claims Table
Copy

{
  "alg": "HS256",
  "typ": "JWT"
}
Decoded Payload
JSON
Claims Table
Copy

{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
JWT Signature Verification
(Optional)
Enter the secret used to sign the JWT below:

Secret
Copy
Clear
Valid secret

a-string-secret-at-least-256-bits-long

first part is the header which contains the algorithm and type of the token
second part is the payload which contains the claims of the token third part is the signature which is used to verify the token and it is generated by using the header and payload and the secret key

const jwt = require("jsonwebtoken");

lets install jsonwebtoken package using npm i jsonwebtoken and then we need to import the package in the userController.js file and use the sign method to generate the access token for the user after successful login

now for login what we want to do is to accept the email and password from the user and then we need to find the user in the database using the email and then we need to compare the password entered by the user with the hashed password stored in the database using the bcrypt package and if the password is correct then we need to generate the access token for the user using the jsonwebtoken package and send it in the response

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //find the user in the database using the email
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        //generate the access token for the user using the jsonwebtoken package
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"15m",
        });
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//jwt sign in method takes three parameters first is the payload which is an object that contains the user information that we want to include in the token second is the secret key which is used to sign the token and third is the options which is an object that contains the expiration time of the token and other options

we can create the secret key in the env file and then we can use it in the userController.js file to sign the token and we can also set the expiration time of the token to 15 minutes or any time we want

this gives us the access token in the response and we can use this access token to access the protected routes in our application and we can also use this access token to authenticate the user in the frontend application and we can also use this access token to authorize the user to access certain resources in our application

access token helps to access private routes so now as in our contactController we have a route to get the current user information and this route should be a private route so that only the logged in user can access this route and for that we need to create a middleware function to protect the route and for that we need to use the jsonwebtoken package to verify the token and we need to use the express-async-handler package to handle the error in async functions and it will send the error message in json format

so next tj=hing we are going to do we are going make all our public routes to private routes and we are going to force validation on those routes so only authenticated user can access those routes and for that we need to create a middleware function to protect the route and for that we need to use the jsonwebtoken package to verify the token and we need to use the express-async-handler package to handle the error in async functions and it will send the error message in json format


currentUser is a private route so we need to protect this route and for that we need to create a middleware function to protect the route and for that we need to use the jsonwebtoken package to verify the token and we need to use the express-async-handler package to handle the error in async functions and it will send the error message in json format

we take the token pass in bearer token in the authorization header and then we need to verify the token using the jsonwebtoken package and if the token is valid then we need to get the user information from the token and send it in the response

middleware validateToken.js

const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const validToken = asyncHandler(async (req,res,next)=>{
    let token;
    //wheneer a user is sending a request the token is passed in header or bearer
    let authHeader = req.headers.Authorization || req.headers.authorization;
    //authrization header always satrt with a bearer and in token we spilt it bearer is at index 0 with some space and token is at index 1
    if(authHeader && authHeader.startsWith("Bearer") ){
        token = authHeader.split(" ")[1];
        //to verify this token 
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
           // console.log(decoded);
           //what i hv have done here is that i hv validate the token and extracted the user from the token 
           req.user = decoded.user;
           //this is the middleware so im going to intercept my req now using nect and then i  am going append user information on the req,user property
           next();
            if(!token){
              res.status(401);
              throw new Error("User is not authorized")  
            }
        })
    }
})

module.exports = validToken;
//its exported so now import it in the user routes for current user as thats the only private route


so the next thing we need to do is we need to protect all our contacts routes so only a logged in user can access those routes and for that we need to use the validToken middleware function in the contactRoutes.js file and we need to import the validToken middleware function in the contactRoutes.js file and then we need to use it as a middleware for all the contact routes 

so first we need to associate the contact with user ID who is creating it 
we will go to ythe contact model and add a new field called userId which will store the id of the user who is creating the contact and then we need to use this userId to get the contacts of the logged in user and we need to use this userId to update and delete the contacts of the logged in user

const contactSchema = mongoose.Schema(
   {
    user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User",
    },

    now lets make all routes private routes in the contactRoutes.js file and for that we need to import the validToken middleware function in the contactRoutes.js file and then we need to use it as a middleware for all the contact routes

    const express = require("express");
const router = express.Router();
const {getContact,createContact,updateContact,deleteContact,getContacts} = require("../controllers/contactController");
const validToken = require("../middleware/validateTokenHandler");

router.use(validToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



//exporting the router 
module.exports = router;


first we need to fetch all contacts of the logged in user and for that we need to use the userId field in the contact model to get the contacts of the logged in user and then we need to send the contacts in the response

