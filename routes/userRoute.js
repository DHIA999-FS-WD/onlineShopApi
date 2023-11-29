const express = require("express");
const {
  createuser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();
const { uservalidator, validate } = require("../middlewares/validators");
const protect = require("../middlewares/authMiddleware");

// login
router.post("/login", loginUser);
// POST :  ADD A NEW USER TO THE DATABASE
router.post("/add", uservalidator, validate, createuser);
//   GET :  RETURN ALL USERS
router.get("/all", protect, getUsers);
//   GET :  RETURN ONE USERS BY ID
router.get("/:id", getUser);
//   delete :  delete ONE USERS BY ID
router.delete("/:id", deleteUser);
//  PUT : EDIT AND UPDATE A USER BY ID
router.put("/:_id", updateUser);

module.exports = router;
