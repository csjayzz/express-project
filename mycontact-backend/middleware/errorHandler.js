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