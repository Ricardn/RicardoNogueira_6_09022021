//Import the Sauce Model and Fs-Extra.
const Sauce = require("../models/sauce");
const fs = require("fs-extra");


//Get All Sauces and display them.
//Then return a status 200 (OK) with a message.
//If error, return the error and status 404 (Not Found).
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};


//Get one Sauce by their _ID then return the sauce.
//Then return a status 200 (OK) with a message.
//If error, return error and status 404 (Not Found).
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};


//Create a New Sauce 
//The value of sauceObject is Json.parse to became a JavaScript Object instead of being a String.
//And create a new Sauce which is filled respecting the Sauce Model.
//The new Sauce is save() to update the DataBase and save the Object.
//Then return a status 201 (Created) with a message.
//If error, return error and status 400 (Bad Request).
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersdisLiked: [" "],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};


//Update the Sauce content
//UpdateOne() of Sauce Model to be sure to update the right object.
//First argument are the Comparison Object, here the object that have the same _ID send by params.
//Then the second argument, will be the new version of the object with the same _ID send by params.
//When the user press "Modify" the new version of the object will be saved overwriting the old version.
//Then return a status 200 (OK) with a message.
//If error, return error and status 400 (Bad Request).
exports.updateSauce = (req, res, next) => {

  Sauce.updateOne(
    { _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};


//Remove the Sauce
//Sauce.findOne to select the sauce by _ID.
//Remove all the data from the Object by unlink the image and delete by _Id.
//Then return a status 200 (OK) with a message.
//If error, return error and status 400 (Bad Request).
//Else, return error and status 500 (Internal Server Error).
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};



//Like And Dislike
exports.likeDislikeSauce = (req, res, next) => {
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

  //Like
  //If liked, update and add '+1' to likes counter.
  //Then return a status 200 (OK) with a message.
  //If error, return error and status 400 (Bad Request).
  switch (like) {
    case 1:
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersLiked: userId }, $inc: { likes: +1 } }
      )
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }));

      break;

    //Neutral
    //If the user click in already liked/unliked this will update and remove -1 to set to '0' neutral.
    //Then return a status 200 (OK) with a message.
    //If error, return error and status 400 (Bad Request).
    case 0:
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then(() => res.status(200).json({ message: `Neutre` }))
              .catch((error) => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
            )
              .then(() => res.status(200).json({ message: `Neutre` }))
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;

    //Unlike
    //If unliked, update and add '+1' to unlikes counter.
    //Then return a status 200 (OK) with a message.
    //If error, return error and status 400 (Bad Request).
    case -1:
      Sauce.updateOne(
        { _id: sauceId },
        { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
      )
        .then(() => {
          res.status(200).json({ message: `Je n'aime pas` });
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    default:
  }
};