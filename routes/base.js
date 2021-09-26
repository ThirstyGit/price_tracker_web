var express = require('express');
var router = express.Router();

const { Request } = require('../database/database.js');
const loginRequired = require('../middleware/loginRequired');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.status(200).send("Came from the wild...");
});*/


router.get('/', (req, res) => {
  res.render("homepage", { user: req.user });
}) 
router.get('/user',loginRequired, (req, res) => {
  res.render('user', { user: req.user });
})
router.get('/userRequest',loginRequired, (req, res) => {
  res.render('userRequest');
})

 /*Arpita */
   
router.post('/userRequest', loginRequired, async (req, res) => {
  // console.log(req.body, req.user);
//  const request = await Request.find({name:req.body.name });
 const request = new Request({
    user_id: req.user._id,
    name: req.body.name,
    website: req.body.website,
    link: req.body.link
  });

  request.save();
  
  res.send('Success');
});


module.exports = router;
