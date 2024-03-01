 const store = require("../store/products");

class ProductService {
  constructor() {}

  async addProduct(data, img) {
    try {
      if (data.name == null) {
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
        original: `https://store-backend-3his.onrender.com/api/v1/products/imagen/${img?.filename}`,
      };

      return store.add(data);
    } catch (error) {
      return error;
    }
  }

  async getProducts() {
    return await store.getAll();
  }

  // async proccesImg(img) {
  //   try {
  //     this.size.forEach(async (element) => {
  //       await this.helperImg(
  //         img.path,
  //         `${element.name}-${img.filename}`,
  //         element.size
  //       );
  //     });
  //     return "success";
  //   } catch (error) {
  //     console.error(error);
  //     return "error";
  //   }
  // }
}

module.exports = ProductService;
