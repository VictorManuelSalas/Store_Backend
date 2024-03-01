const express = require("express");
const products = require("./products");
const { imagens } = require("./imagens");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", products);
  router.use("/imagen", imagens);
}

module.exports = routerApi;
