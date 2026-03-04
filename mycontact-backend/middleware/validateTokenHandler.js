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

