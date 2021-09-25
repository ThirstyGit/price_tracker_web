var express = require('express');
var router = express.Router();

const { Request } = require('../database/database.js');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.status(200).send("Came from the wild...");
});*/


router.get('/', (req, res) => {
  res.render("homepage", { user: req.user });
})
router.get('/user', (req, res) => {
  res.render('user', { user: req.user });
})
router.get('/userRequest', (req, res) => {
  res.render('userRequest');
})
router.post('/userRequest', async (req, res) => {
  // console.log(req.body, req.user);
//  const request = await Request.find({name:req.body.name });
 const request = new Request({
    user_id: req.user._id,
    name: req.body.name,
    website: req.body.website,
    link: req.body.link
  });

  request.save();
  
  res.send('Seccess');
});


module.exports = router;
