const express = require("express");
const router = express.Router(); 

//servcie
const ProductService = require("../services/products");
const service = new ProductService();
const ImageService = require("../services/imagens");
const img_service = new ImageService();

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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await service.getProduct(id);
  res.send({
    response: product.name.includes("CastError")
      ? "Product not exist"
      : product,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProcess = await service.deleteProduct(id);
  const imgStatus = deleteProcess !== "object" ? await img_service.deleteImg(deleteProcess?.img) : "";
  res.send({ deleteProcess, imgStatus});
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updateProduct = await service.updateProduct(id, data);
  res.send({ updateProduct });
});

module.exports = router;
