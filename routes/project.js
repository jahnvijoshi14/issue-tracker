const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homecontroller");

router.get("/", homeController.home);

router.post("/add", homeController.add);

router.get("/details", homeController.details);

router.use("/issue", require("./issueroute"));

module.exports = router;
