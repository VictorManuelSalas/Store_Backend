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
  const product = await Model.findOne({ _id: id });
  if (product) {
    return await product;
  } else {
    return "Product not exist";
  }
}

async function deleteProduct(id) {
  try {
    const product = await Model.findOne({ _id: id });
     
    if (product) {
      const process = await Model.deleteOne({ _id: id })
      return await {process, img: product?.imagen?.original};
    } else {
      return "Product not exist";
    }
  } catch (error) {
    return error;
  }
}

async function updateProduct(id, data) {
  const updateProduct = await Model.updateOne({ _id: id }, { $set: data });
  if (updateProduct) {
    return updateProduct;
  } else {
    return "Product not exist";
  }
}

module.exports = {
  add: addProduct,
  getAll: getProducts,
  getById: getProductId,
  delete: deleteProduct,
  update: updateProduct,
};
