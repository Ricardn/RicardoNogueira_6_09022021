//Import DotEnv module to load environment variables from a .env file.
require("dotenv").config();

//Import the Node Path module that allows to interact with file paths more easily.
const path = require("path");

//Import express framework to build the application.
const express = require("express");

//Import the Object Document Mapping(ODM) mongoose.
const mongoose = require("mongoose");

//Import helmet to secure the Express application by creating various http headers.
const helmet = require('helmet');

//Import the Cors package for providing a connect/express middleware.
const cors = require("cors");

//Import the express-rate-limit
const rateLimit = require('./middleware/ratelimit');


//Call User and Sauces routes.
const userRoutes = require("./routes/user");
const saucesRoutes = require('./routes/sauce');


//Connection to the Database MongoDB.
mongoose
  .connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(rateLimit);

app.use(helmet());

//CORS (Cross-origin resource sharing).
app.use(cors());
app.use(express.json());

//Set the route for /api/auth.
app.use("/api/auth", userRoutes);
//Set the route for /api/sauces.
app.use("/api/sauces", saucesRoutes);

//Set the images path.
app.use("/images", express.static(path.join(__dirname, "images")));

//Export the application
module.exports = app;