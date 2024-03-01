const express = require('express')

const router = express.Router()


const multer = require('multer')
const sharp = require('sharp')

//servcie


//validations Middlewares

//Schemas

//const services = new Service()

const helperImg = (filePath, fileName, size = 300) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`./assets/optimize/${fileName}`)
}

//diskStorage es para definir donde se guardaran las imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/upload') //almacen de imagen cruda
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop() //obtener el nombre desde el . (imagen.png => png)

        cb(null, `${Date.now()}.${ext}`) //cb obtiene el data y genera el doc nombrandolo 
    }
}) 

const upload = multer({ storage }) 

router.get('/', (req,res,next)=>{
    
    res.status(200).send('Hola')
})
//single permite subir solo un archivo a la ves  y recibe el dentificador del elemento que se manda en el postman o en un form 
router.post('/upload', upload.single('file'), (req, res) => {
    const size = [{ name: 'micro', size: 20 }, { name: 'small', size: 100 }, { name: 'medium', size: 500 }, { name: 'large', size: 1000 }]
    size.forEach(element => {
        helperImg(req.file.path, `${element.name}-${req.file.filename}`, element.size)
    }); 

    res.send({ data: 'Imgen cargada' })
})

module.exports = router