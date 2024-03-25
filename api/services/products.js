const store = require("../store/products");

class ProductService {
  constructor() {}

  async addProduct(data, img) {
    try {
      if (
        data.name == "" ||
        data.description == "" ||
        data.price == "" ||
        data.category == ""
      ) {
        return "Datos Faltantes";
      }
      // const reduceImg = await this.proccesImg(img);
      // if (reduceImg !== "success") {
      //   throw new Error("Error en la conversion de imagenes");
      // }
      data.imagen = {
        small: "Not available", //`http://localhost:3001/api/v1/products/imagen/small-${img?.filename}`
        medium: "Not available",
        large: "Not available",
        original: `https://store-backend-3his.onrender.com/api/v1/imagen/upload/${img?.filename}`,
      };
 
      return store.add(data);
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    try {
      return await store.getAll();
    } catch (error) {
      return error;
    }
  }

  async getProduct(id) {
    try {
      const product = await store.getById(id);
      return product;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      return await store.delete(id);
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, data) {
    try {
     
      return await store.update(id, data);
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProductService;
