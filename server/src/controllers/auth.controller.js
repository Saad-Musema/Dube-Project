var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require('../model/user.mongo');

exports.signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  });


  user.save((err, user) => {
    if (err) {
      res.status(500)
        .send({
          message: `User could not be registered ${err}`
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "User Registered successfully"
        })
    }
  });

exports.signin = (req, res) => {

}
};