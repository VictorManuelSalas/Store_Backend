const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

  deleteImg(img) {
    try {
      const image = img.split("/");
      const folder = image[image.length - 1].includes("client")
        ? "clientImg"
        : "upload";
      const fileDir = path.join(
        __dirname,
        `../../assets/${folder}`,
        image[image.length - 1]
      );
      if (fs.existsSync(fileDir)) {
        fs.unlinkSync(fileDir);

        return `Image ${image[image.length - 1]} was deleted successfully.`;
      } else {
        return `Any Image with the name ${
          image[image.length - 1]
        }, was not found.`;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getAllImgServer() {
    const paths = [
      path.join(__dirname, `../../assets/clientImg`),
      path.join(__dirname, `../../assets/upload`),
    ];
    paths.forEach((path) => {
      fs.readdir(path, (error, files) => {
        if (error) {
          console.error("Error al leer la carpeta:", error);
          return;
        }

        console.log(files);
      });
    });
    return "Finish";
  }
}

module.exports = ImageService;
