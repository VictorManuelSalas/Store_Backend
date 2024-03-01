const multer = require("multer");
// const sharp = require("sharp");
const store = require("../store/products");

class ProductService {
  constructor() {
    // this.size = [
    //   { name: "small", size: 100 },
    //   { name: "medium", size: 500 },
    //   { name: "large", size: 1000 },
    // ];

    // this.helperImg = (filePath, fileName, size = 300) => {
    //   return sharp(filePath)
    //     .resize(size)
    //     .toFile(`./assets/optimize/${fileName}`);
    // };

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./assets/upload"); //almacen de imagen cruda
      },
      filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop(); //obtener el nombre desde el . (imagen.png => png)

        cb(null, `${Date.now()}.${ext}`); //cb obtiene el data y genera el doc nombrandolo
      },
    });

    this.fileFilter = (req, file, cb) => {
      const allowedMimes = ["image/jpeg", "image/png", "image/gif"];

      if (allowedMimes.includes(file.mimetype)) {
        // Aceptar el archivo
        cb(null, true);
      } else {
        // Rechazar el archivo
        cb(
          new Error("Tipo de archivo no permitido. Solo se permiten imágenes.")
        );
      }
    };
  }

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
        small: 'Not available',//`http://localhost:3001/api/v1/products/imagen/small-${img?.filename}` 
        medium:  'Not available',
        large:  'Not available',
        original: `https://store-backend-3his.onrender.com/api/v1/products/imagen/${img?.filename}`,
      };

      return store.add(data);
    } catch (error) {
      return error;
    }
  }


  async getProducts(){
    return await store.getAll()
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
