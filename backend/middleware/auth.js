//Import jwt to create a secret Token.
const jwt = require('jsonwebtoken');


//Get the Token of headers.authorization.
module.exports = (req, res, next) => {
    try {
    //We slipt them and take only yhe second element inside [].
    const token = req.headers.authorization.split(' ')[1];
    //Decode the Token and verify the Token with the secret key of env.token.
    const decodedToken = jwt.verify(token, process.env.token);
    //Get UserId from the decoded Token.
    const userId = decodedToken.userId;
        //If the userId do not match with the userID from the decoded Token throw error message.
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !'
        } else {
          //Else, if that match the user is authenticated.
          next();
        }
    } catch (error) {
      //If error, return error and status 401 (Unauthorized).
      res.status(401).json({ error: error | "Requete non authentifiée !" });
    }
}