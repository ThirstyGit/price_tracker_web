var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.status(200).send("Came from the wild...");
});*/
router.get('/', (req, res) => {
  res.render('homepage');
})

module.exports = router;
