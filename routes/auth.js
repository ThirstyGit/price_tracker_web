// All Imports.
const router = require('express').Router();
const bcrypt = require("bcrypt");

// Importing database modules.
const { User } = require('../database/database.js');

router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.json({ message: "User Already Exists!" });
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 14);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user.save();
    res.json({ message: "success" });
  }
});

module.exports = router;