const express = require("express");
const authRoute = require("./routes/authRoute.js");
const movieRoute = require("./routes/movieRoute.js");
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

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movies", movieRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
