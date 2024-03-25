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
  try {
    const data = req.body;
    const img = req.file;
    const product = await service.addProduct(data, img);
    res.send({ response: `New Product Added`, product });
  } catch (error) {
    res.send({error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await service.getProduct(id);
  res.send({
    response: product,
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProcess = await service.deleteProduct(id);
  const imgStatus =
    deleteProcess !== "object"
      ? await img_service.deleteImg(deleteProcess?.img)
      : "";
  res.send({
    response:
      deleteProcess !== "Product not exist" ? "Product deleted" : deleteProcess,
    imgStatus,
  });
});

router.put("/:id", uploadProduct.single("file"), async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const img = req.file;
  if (img !== undefined) {
    const product = await service.getProduct(id);
    if (product !== "Product not exist") {
      await img_service.deleteImg(product.imagen.original);
      data.imagen = {
        small: "",
        medium: "",
        large: "",
        original: `https://store-backend-3his.onrender.com/api/v1/imagen/upload/${img?.filename}`,
      };
    } else {
      await img_service.deleteImg(img.filename);
    }
  }
  const updateProduct = await service.updateProduct(id, data);
  res.send({ response: updateProduct.message });
});

module.exports = router;
