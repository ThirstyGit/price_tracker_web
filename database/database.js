// imports
const mongoose = require("mongoose");

// Database connection
mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@pricetracker.f9njy.mongodb.net/priceTracker?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});
