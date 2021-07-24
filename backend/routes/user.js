//Import express framework to build the application.
const express = require("express");
//Import the router from the express framework to build the application roads.
const router = express.Router();

//Call the middleware to improve the road security.
const passwordValidator = require("../middleware/passwordValidation");

//Call the User controller.
const userCtrl = require("../controllers/user");

//Set the roads of the application.
router.post("/signup", passwordValidator, userCtrl.signup);
router.post("/login", userCtrl.login);

//Export the User router. 
module.exports = router;
