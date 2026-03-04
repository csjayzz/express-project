const mongoose = require("mongoose");
//mongoose object//model files are for defining schema
const contactSchema = mongoose.Schema(
   {
    user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User",
    },
     name:{
        type: String,
        required:[true,"Please add the contact name"],
    },
     email:{
        type: String,
        required:[true,"Please add the contact email"],
    },
     phone:{
        type: String,
        required:[true,"Please add the contact phone number"],
    }
},{
    timestamps : true,
});


module.exports = mongoose.model("Contact",contactSchema);
//Contact is the name of the model