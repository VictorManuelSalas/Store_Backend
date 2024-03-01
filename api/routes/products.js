const express = require("express");
const router = express.Router();
const path = require("path");

//servcie
const ProductService = require("../services/products");
const service = new ProductService();

const { uploadProduct } = require("./imagens");

//validations Middlewares

//Schemas

router.get("/", async (req, res) => {
  const products = await service.getProducts();
  res.status(200).send({ products });
});

router.post("/", uploadProduct.single("file"), async (req, res) => {
  const data = req.body;
  const img = req.file;
  const product = await service.addProduct(data, img);
  res.send({ response: `New Product Added`, product });
});

module.exports = router;
