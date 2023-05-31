const mongoose = require("mongoose");
if (profile.name === "dev") {
  mongoose.connect("mongodb://localhost:27017/issues");

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

  db.once("open", function () {
    console.log("Connected to Database :: MongoDB");
  });

  module.exports = db;
}
