// generate token with JWT
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
