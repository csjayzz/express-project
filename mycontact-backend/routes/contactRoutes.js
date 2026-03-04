const express = require("express");
const router = express.Router();
const {getContact,createContact,updateContact,deleteContact,getContacts} = require("../controllers/contactController");
const validToken = require("../middleware/validateTokenHandler");

router.use(validToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



//exporting the router 
module.exports = router;