const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

// const protect = require("../middlewares/authMiddleware");

// POST :  ADD A NEW Product TO THE DATABASE
router.post("/add", createProduct);
//   GET :  RETURN ALL Product
router.get("/all", getProducts);
//   GET :  RETURN ONE Product BY ID
router.get("/:id", getProduct);
//   delete :  delete ONE Product BY ID
router.delete("/:id", deleteProduct);
//  PUT : EDIT AND UPDATE A Product BY ID
router.put("/:_id", updateProduct);

module.exports = router;
