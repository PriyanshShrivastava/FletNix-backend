const express = require("express");

//Creating router
const router = express.Router();

//get-all movies and tv shows
router.get("/data", loginTokenCheck, getAllData);
