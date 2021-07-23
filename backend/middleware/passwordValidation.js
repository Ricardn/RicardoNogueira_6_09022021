//Import passwordSchema model
const passwordSchema = require('../models/password');

//If the password dont match with the model return status 400 error
//Else the user acount will be created
module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ error: "Veuillez choisir un mot de passe plus fort !"});
    } else {
        next();
    }
}