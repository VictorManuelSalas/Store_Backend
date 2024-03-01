const multer = require("multer");
// const sharp = require("sharp");

class ImageService {
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

    this.storageProduct = multer.diskStorage({
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

    this.storageClient = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./assets/clientImg"); //almacen de imagen cruda
      },
      filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop(); //obtener el nombre desde el . (imagen.png => png)

        cb(null, `client-${Date.now()}.${ext}`); //cb obtiene el data y genera el doc nombrandolo
      },
    });
  }
}

module.exports = ImageService;
