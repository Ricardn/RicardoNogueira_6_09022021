module.exports = (req, res, next) => {
  //Check if the body of Sauce is undefined.
  if (JSON.parse(req.body.sauce !== undefined)) {
    //Create the array with name, manufacturer, description and mainPepper of Sauce.
    const sauce = JSON.parse(req.body.sauce);
    let { name, manufacturer, description, mainPepper } = sauce;
    let trimedTab = [];

    //Remove all Trim(white spaces) from the input.
    function toTrim(...string) {
      trimedTab = string.map((elt) => elt.trim());
    }
    toTrim(name, manufacturer, description, mainPepper);

    //Check if the input have at least 3 characteres.
    const hasThreeCharacteres = (currentValue) => currentValue.length >= 3;
    //If the input have at least or more than 3 characteres call next function.
    if (trimedTab.every(hasThreeCharacteres)) {
      next();
    } else {
      //Else, if the input have less than 3 characteres, throw a error message.
      throw new Error("Tous les champs doivent faire au moins 3 caractères");
    }
  } else {
    const sauce = req.body;
    let { name, manufacturer, description, mainPepper } = sauce;
    let trimedTab = [];

    //Remove all Trim(white space).
    function toTrim(...string) {
      trimedTab = string.map((elt) => elt.trim());
    }
    toTrim(name, manufacturer, description, mainPepper);

    //Check that all inputs have more than 3 characteres.
    const hasThreeCharacteres = (currentValue) => currentValue.length >= 3;
    if (trimedTab.every(hasThreeCharacteres)) {
      //Call the next function.
      next();
    } else {
      //If all the fields are not correctly filled, throw a error message.
      throw new Error("Tous les champs doivent faire au moins 3 caractères");
    }
  }
};
