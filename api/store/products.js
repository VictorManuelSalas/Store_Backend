//Logica de almacenamiento a la db

const Model = require("../schemas/products");

async function addProduct(product) {
  const newProduct = await new Model(product);
  return newProduct.save();
}

async function getProducts() {
  const products = await Model.find();
  console.log(products)
  return products;
}

module.exports = { add: addProduct, getAll: getProducts };
