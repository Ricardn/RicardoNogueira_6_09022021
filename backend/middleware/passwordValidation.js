//Import passwordSchema model.
const validator = require("../helpers/password");

//Check if the the password match with the model.
module.exports = (req, res, next) => {
    if (!validator.validate(req.body.password)) {
      res
        //If error, return error and status 400 (Bad Request).
        .status(400)
        .json({ error: "Veuillez choisir un mot de passe plus fort !" });
    } else {
      //Else the user acount will be created.
      next();
    }
}