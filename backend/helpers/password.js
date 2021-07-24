//Import Password-Validator
const passwordValidator = require("password-validator");

//Create a new validator
const validator = new passwordValidator();

//Add properties to the validator
validator
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "Qwerty123", "Azerty123"]); // Blacklist these values

module.exports = validator;
