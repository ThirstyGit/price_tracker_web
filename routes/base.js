var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
// Importing database modules.
const { User, Products } = require('../database/database.js');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.status(200).send("Came from the wild...");
});*/
router.get('/', async (req, res) => {
  const products = await Products.find().limit(9);
  //console.log(products);
  res.render("homepage", { user: req.user, products});
})


router.get('/user', (req, res) => {
  res.render('user', { user: req.user });
})


router.get('/userRequest', (req, res) => {
  res.render('userRequest');
})


router.get('/userEdit', (req, res) => {
  res.render('userEdit',{ user: req.user });
})



//********************************** */

router.put('/userEditInfo', async (req, res) => {
  const user= await User.findOneAndUpdate(
    {_id:req.user._id},
    { $set: { name:req.body.name,email:req.body.email}}   
  );
  user.save();
  //console.log(req.user);
  res.send("");
})

router.put('/changepassword', async (req, res) => {

  req.body.password = bcrypt.hashSync(req.body.password, 14);
  const user= await User.findOneAndUpdate(
    {_id:req.user._id},
    { $set: { password:req.body.password}}   
  );
  user.save();
  //console.log(req.user);
  res.send("");
})

module.exports = router;
