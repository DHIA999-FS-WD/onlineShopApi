const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokenn");

const createuser = async (req, res) => {
  try {
    const user = new User(req.body);
    const { email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) res.status(400).json("user with this eamil existe");

    //hash password
    const hashPsw = await bcrypt.hash(password, 10);
    user.password = hashPsw;
    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log("errrr", error);
  }
};

const getUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    res.json(usersList);
  } catch (error) {
    console.log("errr", error);
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne(userId);
    res.json(user);
  } catch (error) {
    console.log("errr", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      await user.deleteOne();
      res.status(200).json("user deleted");
    } else {
      return res.status(400).json("user not found");
    }
  } catch (error) {
    console.log("errr", error);
  }
};

let updateUser = async (req, res) => {
  const updateData = req.body;
  const { password } = updateData;
  // hash password
  const hashPsw = await bcrypt.hash(password, 10);
  updateData.password = hashPsw;
  let newData = await User.updateOne(req.params, { $set: updateData });

  if (Object.keys(req.body).length == 0) {
    res.status(400).json("data not  found");
  } else {
    res.status(200).json(newData);
  }
};
// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const userEmail = user.email;
    const userPassword = user.password;
    // check passwoed and email
    bcrypt.compare(password, userPassword, (err, result) => {
      if (result == true && email == userEmail) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          role: user.role,
        });
      } else {
        res.status(401).json({ message: "not found" });
      }
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};
module.exports = {
  createuser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
};
