// Remove all Trim(white space) and check if the input have at least 3 characteres, if not set error, if yes the costumer can click and input 
module.exports = (req, res, next) => {
  if (JSON.parse(req.body.sauce !== undefined)) {
    const sauce = JSON.parse(req.body.sauce);
    let { name, manufacturer, description, mainPepper } = sauce;
    let trimedTab = [];

    function toTrim(...string) {
      trimedTab = string.map((elt) => elt.trim());
    }
    toTrim(name, manufacturer, description, mainPepper);

    const hasThreeCharacteres = (currentValue) => currentValue.length >= 3;
    if (trimedTab.every(hasThreeCharacteres)) {
      next();
    } else {
      throw new Error("Tous les champs doivent faire au moins 3 caractères");
    }
  } else {
    const sauce = req.body;
    let { name, manufacturer, description, mainPepper } = sauce;
    let trimedTab = [];

    function toTrim(...string) {
      trimedTab = string.map((elt) => elt.trim());
    }
    toTrim(name, manufacturer, description, mainPepper);

    const hasThreeCharacteres = (currentValue) => currentValue.length >= 3;
    if (trimedTab.every(hasThreeCharacteres)) {
      next();
    } else {
      throw new Error("Tous les champs doivent faire au moins 3 caractères");
    }
  }
};
