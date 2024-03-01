const express = require("express");
const router = express.Router();
const path = require("path");

//servcie
const ProductService = require("../services/products");
const service = new ProductService();

//Img Process
const multer = require("multer");
const upload = multer({
  storage: service.storage,
  fileFilter: service.fileFilter,
});
//

//validations Middlewares

//Schemas

router.get("/", (req, res, next) => {
  res.status(200).send("Hola");
});

router.post("/", upload.single("file"), async (req, res) => {
  const data = req.body;
  const img = req.file;
  const product = await service.addProduct(data, img);
  res.send({ data, product });
});


//Img Viewer
router.use(
  "/upload",
  express.static(path.join(__dirname, "../../assets", "upload"))
);
router.use(
  "/optimize",
  express.static(path.join(__dirname, "../../assets", "optimize"))
);
router.get("/imagen/:imgName", (req, res) => {
  const imgName = req.params.imgName; 
  imgName.includes("-")
    ? res.send(
        `<img src="http://localhost:3001/api/v1/products/optimize/${imgName}" alt="${imgName}">`
      )
    : res.send(
        `<img src="http://localhost:3001/api/v1/products/upload/${imgName}" alt="${imgName}">`
      );
});

module.exports = router;