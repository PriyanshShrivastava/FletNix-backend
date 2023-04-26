const express = require("express");
const loginTokenCheck = require("../middlewares/authMiddleWare.js");
const { getAllData, getSpecificShow } = require("../controller/getAllData.js");

//Creating router
const router = express.Router();

//get-all movies and tv shows
router.get("/shows/:page?", loginTokenCheck, getAllData);

//get specific movie detail
router.get("/single-show/:show_id", loginTokenCheck, getSpecificShow);

// exporting router
module.exports = router;
