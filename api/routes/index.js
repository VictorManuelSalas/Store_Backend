const express = require("express");
const products = require("./products");
const { imagens } = require("./imagens");
const clients = require("./clients");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", products);
  router.use("/imagen", imagens);
  router.use("/client", clients);
}

module.exports = routerApi;
