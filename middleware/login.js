const { User } = require('../database/database.js')

// storing the data if logged in.
module.exports.authenticate = async (req, res, next) => {
  global.user = undefined;
  if (!(req.session && req.session.userId)) {
    return next();
  }
  const user = await User.findOne({ id: req.session.userId });
  if(user) {
    result[0].password = undefined;
    req.user = result[0];
    res.locals.user = result[0];
  }
  next();
};
