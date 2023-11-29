const Product = require("../models/ProductModel");

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const { title } = req.body;
    const exist = await Product.findOne({ title });
    if (exist) res.status(400).json("product existe");

    const newProduct = await product.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log("errrr", error);
  }
};

const getProducts = async (req, res) => {
  try {
    const productList = await Product.find();
    res.json(productList);
  } catch (error) {
    console.log("errr", error);
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.json(product);
  } catch (error) {
    console.log("errr", error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      await Product.deleteOne();
      res.status(200).json("product deleted");
    } else {
      return res.status(400).json("product not found");
    }
  } catch (error) {
    console.log("errr", error);
  }
};

let updateProduct = async (req, res) => {
  const updateData = req.body;

  let newData = await Product.updateOne(req.params, { $set: updateData });

  if (Object.keys(req.body).length == 0) {
    res.status(400).json("data not  found");
  } else {
    res.status(200).json(newData);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
