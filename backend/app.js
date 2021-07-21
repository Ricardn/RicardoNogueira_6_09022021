require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const cors = require("cors");

const userRoutes = require("./routes/user");
const saucesRoutes = require('./routes/sauce');

mongoose
  .connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(cors());

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

module.exports = app;