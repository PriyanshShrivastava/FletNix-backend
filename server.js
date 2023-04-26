const express = require("express");
const authRoute = require("./routes/authRoute.js");
const showRoute = require("./routes/showsRoute.js");
const connectDB = require("./config/db.js");
const cors = require("cors");
require("dotenv").config();

// Calling the express function
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Databse connection
connectDB();

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movies", showRoute);

// Server Listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
