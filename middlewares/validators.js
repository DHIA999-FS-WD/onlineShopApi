const { check, validationResult } = require("express-validator");

exports.uservalidator = [
  check("name").trim().notEmpty().withMessage("name is missing"),
  check("email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("email missing"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("password is missing")
    .isLength({ min: 8, mas: 12 })
    .withMessage("password must have 8 to 12 character"),
];
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) res.json({ error: error[0].msg });
  else {
    next();
  }
};
