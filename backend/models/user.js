//Import the Object Document Mapping(ODM) mongoose.
const mongoose = require("mongoose");
//Import the pluggin unique-validator of mongoose.
const uniqueValidator = require("mongoose-unique-validator");

//Create the User Schemma with mongoose.Schema to define the Schema used by MongoDB.
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Apply the uniqueValidator plugin to userSchema.
//Unique-Validator will check for duplicate database entries and report them by sending an error.
userSchema.plugin(uniqueValidator);

//Export the model userSchema of User.
module.exports = mongoose.model("User", userSchema);
