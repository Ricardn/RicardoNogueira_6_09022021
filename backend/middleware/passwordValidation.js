//Import passwordSchema model
const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ error: "Veuillez choisir un mot de passe plus fort !"});
    } else {
        next();
    }
}