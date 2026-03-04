const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
//controller handles the res and req of the router 
// whenever we create an api method we always need to give some labels to that 
//how -> @description for get all contacts 
//@route GET /api/contacts
//define the access to the api 

const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@description for Create new contact  
//@route POST /api/contacts
//define the access to the api 
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
        user_id : req.user.id,
    })
    res.status(201).json({message : `created new contact`,contact})
});

const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
     if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});


const updateContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
    res.status(402);
    throw new Error("User dont have permission to update user contacts")
};

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(202).json(updatedContact);
});
const deleteContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
     if(contact.user_id.toString() !== req.user.id){
    res.status(402);
    throw new Error("User dont have permission to update user contacts")
};
    await Contact.findByIdAndDelete(req.params.id);
    res.status(203).json(contact);
});



module.exports = {getContact,createContact,updateContact,deleteContact,getContacts};