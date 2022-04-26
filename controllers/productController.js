const req = require("express/lib/request");
const res = require("express/lib/response");
const product = require("../models/productModel");
const javascriptBarcodeReader = require("javascript-barcode-reader");

//add new product
const addProduct = async (req, res) => {
  const productdata = new product({
    image: req.files,
    name: req.body.name,
    discription: req.body.discription,
    price: req.body.price,
    barcode: req.body.barcode,
  });
  try {
    const product = await productdata.save();
    res.json(product);
  } catch (err) {
    res.json(err.message);
  }
};

//get all product details
const getAllProduct = async (req, res) => {
  try {
    const allProducts = await product.find();
    res.json(allProducts);
  } catch (err) {
    res.json(err.message);
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
    let reader = new BarCodeReader(req.bod.barcode, null, null);
    const identifyProduct = reader.readBarCodes().forEach(function (result, i, results) {
      return product.find({barcode:result.getCodeText})
    });
    res.json(identifyProduct);
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  editProductDetails,
  deleteProduct,
  getProductByBarcode,
};
