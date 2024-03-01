//Logica de almacenamiento a la db

const Model = require("../schemas/products");

function addProduct(product) {
  const newProduct = new Model(product);
  return newProduct.save();
}

module.exports = { add: addProduct };
