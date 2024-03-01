//Logica de almacenamiento a la db

const Model = require("../schemas/products");

async function addProduct(product) {
  const newProduct = await new Model(product);
  return newProduct.save();
}

async function getProducts() {
  const products = await Model.find();
  console.log(products);
  return products;
}

async function getProductId(id) {
  const product = await Model.findById(id);
  return product;
}

async function deleteProduct(id) {
  try {
    const product = await Model.findById(id);
    if (product) {
      return await Model.deleteOne({ _id: id });
    } else {
      return "Product not exist";
    }
  } catch (error) {
    return error;
  }
}

async function updateProduct(id, data) {
  const foundUser = await Model.findOne({ _id: id })
  foundUser.name = data.name
  const response = await foundUser.save()
  return response
}

module.exports = {
  add: addProduct,
  getAll: getProducts,
  getById: getProductId,
  delete: deleteProduct,
  update: updateProduct,
};
