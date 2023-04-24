const fs = require("fs");
const csv = require("csv-parser");
const filename = "data.csv";
const mongoose = require("mongoose");
require("dotenv").config();

const Shows = require("../model/showModel.js");

const url = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connection established");
  let counter = 0;
  fs.createReadStream(filename)
    .pipe(csv())
    .on("data", async (row) => {
      row.cast = String(row.cast)
        .split(",")
        .map((oneCast) => String(oneCast).trim());
      row.listed_in = String(row.listed_in)
        .split(",")
        .map((oneList) => String(oneList).trim());
      counter += 1;
      const temp = counter;
      const newShow = new Shows(row);
      await newShow.save();
      console.log(temp, "rows inserted");
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
});
