// imports
const mongoose = require("mongoose");
require("dotenv").config(); // Getting all the environment variables.

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

// Creating Schemas.
// Creating a Schema for Users.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true
  },
  price_history: {
    price: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
});

module.exports.User = mongoose.model("user", userSchema);
module.exports.Products = mongoose.model("product", productSchema);
