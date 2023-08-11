///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4321
// pull DATABASE_URL from .env
const { PORT = 4321, DATABASE_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Connected to mongoose"))
  .on("close", () => console.log("Disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const BeerSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
});

const Beer = mongoose.model("Beer", BeerSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("Hi Server");
});

// INDEX ROUTE
app.get("/beer", async (req, res) => {
  try {
    // send all beers
    res.json(await Beer.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.post("/beer", async (req, res) => {
  try {
    // send all examples
    res.json(await Beer.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.put("/beer/:id", async (req, res) => {
  try {
    // send all beers
    res.json(
      await Beer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.delete("/beer/:id", async (req, res) => {
  try {
    // send all beers
    res.json(await Beer.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));