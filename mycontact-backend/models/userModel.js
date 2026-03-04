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