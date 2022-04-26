const req = require("express/lib/request");
const res = require("express/lib/response");
const product = require("../models/productModel");

//add new product
const addProduct = async (req, res) => {
  const productdata = new product({
    image: req.body.Image,
    name: req.body.name,
    discription: req.body.discription,
    price: req.body.price,
    barcode: req.body.barcode,
  });
  try {
    const product = await productdata.save();
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

//get all product details
const getAllProduct = async (req, res) => {
  try {
    const allProducts = await product.find();
    res.json(allProducts);
  } catch (error) {
    res.json(error);
  }
};

//get product by id
const getProductById = async (req, res) => {
  try {
    const productDetails = await product.findById(req.params.id);
    const price = productDetails.price;
    const pricePercentage = (price * 5) / 100;
    const updatedPrice = (productDetails.price += pricePercentage);
    console.log(updatedPrice);
    res.json(productDetails);
  } catch (error) {
    res.json(error);
  }
};

//edit product details
const editProductDetails = async (req, res) => {
  try {
    const dataForUpdate = {
      image: req.body.image,
      name: req.body.name,
      discription: req.body.discription,
      price: req.body.price,
    };
    const productdata = await product.findByIdAndUpdate(
      req.params.id,
      dataForUpdate,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(productdata);
  } catch (error) {
    res.json(error.message);
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const Handledelete = await product.findByIdAndDelete({
      _id: req.params.id,
    });
    res.json("delete Successfully");
  } catch (error) {
    res.json(error.message);
  }
};

//get Product By Barcode
const getProductByBarcode = async (req, res) => {
    try {
        const productByBarcode = await product.find({barcode : req.body.barcode})
        res.json(productByBarcode);
    } catch (error) {
        res.json(error.message)
    }
};
module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  editProductDetails,
  deleteProduct,
  getProductByBarcode
};
