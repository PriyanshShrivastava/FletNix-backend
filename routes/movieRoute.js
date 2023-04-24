const express = require("express");
const loginTokenCheck = require("../middlewares/authMiddleWare.js");
const getAllData = require("../controller/getAllData.js");

//Creating router
const router = express.Router();

//get-all movies and tv shows
router.get("/data", getAllData);

module.exports = router;
