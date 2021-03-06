const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const parser = require("../middleware/ImageUpload");
const {
  addProduct,
  getAllProduct,
  getProductById,
  editProductDetails,
  deleteProduct,
  getProductByBarcode,
} = require("../controllers/productController");

router.post("/",parser.array('images'), addProduct);
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.patch("/:id", editProductDetails);
router.delete("/:id", deleteProduct);
router.get("barcode/:id", getProductByBarcode);

module.exports = router;
