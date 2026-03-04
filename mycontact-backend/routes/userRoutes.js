const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register",registerUser)
//login endpoint
router.post("/login",loginUser)
//current endpoint should be a get req
router.get("/current",validToken,currentUser)

module.exports = router;