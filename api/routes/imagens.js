const express = require("express");
const router = express.Router();
const path = require("path");

const ImageService = require("../services/imagens");
const service = new ImageService();

//Img Process
const multer = require("multer");
const uploadProduct = multer({
  storage: service.storageProduct,
  fileFilter: service.fileFilter,
});

const uploadClient = multer({
  storage: service.storageClient,
  fileFilter: service.fileFilter,
});

//

router.post("/newImgClient", uploadClient.single("file"), async (req, res) => {
  try {
    const img = req.file;
    res.send({
      imgUrl: img?.filename
        ? `https://store-backend-3his.onrender.com/api/v1/imagen/${img?.filename}`
        : "Error",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Img Viewer
router.use(
  "/upload",
  express.static(path.join(__dirname, "../../assets", "upload"))
);
router.use(
  "/clientImg",
  express.static(path.join(__dirname, "../../assets", "clientImg"))
);

router.get("/:imgName", (req, res) => {
  const imgName = req.params.imgName;
  imgName.includes("-")
    ? res.send(
        `<img src="https://store-backend-3his.onrender.com/api/v1/imagen/clientImg/${imgName}" alt="${imgName}">`
      )
    : res.send(
        `<img src="https://store-backend-3his.onrender.com/api/v1/imagen/upload/${imgName}" alt="${imgName}">`
      );
});

module.exports = { imagens: router, uploadProduct };
