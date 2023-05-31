require("dotenv").config();
const profile = require("./config/enviroment");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
let db = "";
if (profile.name === "dev") {
  db = require("./config/mongoose");
}
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;

// connect to cloud database

if (profile.name === "prod") {
  mongoose.set("strictQuery", false);
  db = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${port}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
}

// this is for the form data
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", "./views");

// this is for the static folder
app.use(express.static("./assets"));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes/project"));

if (profile.name === "dev") {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Error in running the server: ${err}`);
      return;
    }

    console.log(`Server is running on port: ${port}`);
  });
}

// this is for deployment
if (profile.name === "prod") {
  db().then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
      }

      console.log(`Server is running on port: ${port}`);
    });
  });
}
