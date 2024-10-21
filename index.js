const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const apiRoutes = require('./routers/controller.js');
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017/Airwaymanagement";

mongoose.connect(uri, {})
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
