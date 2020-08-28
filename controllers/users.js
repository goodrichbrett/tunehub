const User = require('../models/user');

module.exports = {
  index,
};

function index(req, res) {
  User.find({})
  .then(users => {
    res.render('users/index', { user: req.user, users })
  })
}