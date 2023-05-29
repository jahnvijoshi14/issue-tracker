const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");
const app = express();
const port = 8000;

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

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }

  console.log(`Server is running on port: ${port}`);
});
