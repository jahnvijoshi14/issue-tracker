const express = require("express");
const router = express.Router();

// all the url staring with /issue will be come to this router
const issueController = require("../controllers/issuecontroller");

router.post("/createissue", issueController.add);

router.post("/search", issueController.search);

router.get("/final-all", issueController.findAll);

router.post("/filter", issueController.filter);

module.exports = router;
