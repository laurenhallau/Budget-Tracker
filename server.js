// Require Packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// Assigning a heroku port to use or local host 3000
const PORT = process.env.PORT || 3000;

// Creating an instance of express inside a variable
const app = express();

app.use(logger("dev"));

// Middleware set-up
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting the root directory to the public folder
app.use(express.static("public"));

// Connecting to the MongoDB or localDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Setting up routes to use 
app.use(require("./routes/api")); 

// Listening on assigned port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});