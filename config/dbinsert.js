const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
require("dotenv").config();

const url = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to MongoDB");

  const data = [];

  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (row) => {
      // Remove any blank spaces or tabs from the row data
      Object.keys(row).forEach((key) => (row[key] = row[key].trim()));

      // Check if any columns are null or blank
      Object.keys(row).forEach((key) => {
        if (row[key] === null || row[key] === "") {
          row[key] = undefined; // set to undefined to avoid validation errors
        }
      });

      // Convert comma-separated values to array for "cast" and "listed_in" columns
      if (row.cast) {
        row.cast = row.cast.split(",").map((item) => item.trim());
      }
      if (row.listed_in) {
        row.listed_in = row.listed_in.split(",").map((item) => item.trim());
      }

      data.push(row);
    })
    .on("end", () => {
      // Insert data into MongoDB using insertMany() method
      db.collection("movies").insertMany(data, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${result.insertedCount} documents inserted`);
        }

        // Close database connection when finished reading and saving data
        db.close();
      });
    })
    .on("error", (err) => {
      console.error("Error reading CSV file:", err);
    });
});
