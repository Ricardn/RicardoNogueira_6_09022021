require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const cors = require("cors");

const userRoutes = require("./routes/user");
const saucesRoutes = require('./routes/sauce');


//connection to the Database MongoDB
mongoose
  .connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(helmet());

//CORS (Cross-origin resource sharing)
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;