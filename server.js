const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Databse connection
connectDB();

app.use("/api/v1/movies", movieRoute);
