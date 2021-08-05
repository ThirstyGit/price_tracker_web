// All Imports.
const router = require('express').Router();
const bcrypt = require("bcrypt");

// Importing database modules.
const { User } = require('../database/database.js');

router.post("/register", async (req, res) => {
  // Making sure the email is not already registered.
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.json({ message: "User Already Exists!" });
  }
  else {
    // Checking if user type is already set. If not, default to 'user'
    type = 'user'
    if(req.body.type) {
      type = req.body.type;
    }
    // Hashing the password before sotring it to the database.
    req.body.password = bcrypt.hashSync(req.body.password, 14);
    // Creating the data and saving it to the database.
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type
    });
    user.save();
    res.json({ message: "success" });
  }
});

module.exports = router;