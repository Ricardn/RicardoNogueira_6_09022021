//Import express framework to build the application.
const express = require("express");
//Import the router from the express framework to build the application roads.
const router = express.Router();

//Call the middleware to improve the road security.
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const checkSauceInput = require("../middleware/checkSauceInput");

//Call the Sauce controller.
const sauceCtrl = require("../controllers/sauce");

//Set the roads of the application.
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, checkSauceInput, sauceCtrl.createSauce);
router.put("/:id", auth, multer, checkSauceInput, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

//Export the Sauce router. 
module.exports = router;
