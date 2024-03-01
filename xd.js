

const helperImg = (filePath, fileName, size = 300) => {
  return sharp(filePath).resize(size).toFile(`./assets/optimize/${fileName}`);
};

//diskStorage es para definir donde se guardaran las imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/upload"); //almacen de imagen cruda
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop(); //obtener el nombre desde el . (imagen.png => png)

    cb(null, `${Date.now()}.${ext}`); //cb obtiene el data y genera el doc nombrandolo
  },
});

const upload = multer({ storage });

const size = [
  { name: "micro", size: 20 },
  { name: "small", size: 100 },
  { name: "medium", size: 500 },
  { name: "large", size: 1000 },
];
size.forEach((element) => {
  helperImg(
    req.file.path,
    `${element.name}-${req.file.filename}`,
    element.size
  );
});
