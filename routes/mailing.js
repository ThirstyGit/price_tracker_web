var express = require('express');
var router = express.Router();
// const { Products } = require('../database/database');
const {mail} = require('../functions/mailer');
/* GET home page. */
router.get('/', async (req, res, next) => {

    mail(req.body.email, req.body.product, req.body.currPrice);
});

module.exports = router;
