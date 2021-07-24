//Import the User Model, the package bcrypt to hash passwords and jwt to create a secret Token.
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup
exports.signup = (req, res, next) => {
  //Start by hashing the Password by calling bcrypt.
  bcrypt
    //Take the password who went through the body and Hash 10 times to be sure it will be secured.
    .hash(req.body.password, 10)
    .then((hash) => {
      //Then create a new User using the User Model.
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      //Take the email who went through the body and the Password Hashed.
      user
        //Then save() to save the data in the DataBase.
        .save()
        //Then return a status 201 (Created) with a message.
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        //If error, return error and status 400 (Bad Request).
        .catch((error) => res.status(400).json({ error }));
    })
    //If error, return error and status 500 (Internal Server Error).
    .catch((error) => res.status(500).json({ error }));
};

//Login
exports.login = (req, res, next) => {
  //Start by checking with findOne() if the email send by the User match with the email stock in DataBase.
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        //If the Email does not match return error and status 401(Unauthorized).
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //Else, use Bcrypt to compare if the password send by the user match with Password Hashed sotck in Database.
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            //If the password does not match, return error and status 401 (Unauthorized).
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //Else, return a status 200 (OK) and create an Authentication Token who contains the _ID of the user and is available for 24h.
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.token, {
              expiresIn: "24h",
            }),
          });
        })
        //If error, return error and status 500 (Internal Server Error).
        .catch((error) => res.status(500).json({ error }));
    })
    //If error, return error and status 500 (Internal Server Error).
    .catch((error) => res.status(500).json({ error }));
};
