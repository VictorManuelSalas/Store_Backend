const mongoos = require('mongoose')

const Schema = mongoos.Schema;//obtener y almacenar el atributo de schema 

//Aqui se define el schema de la tabla(campos)
const mySchema = new Schema({
    name: { type: String, requeried: true }
})

const model = mongoos.model('Tester', mySchema) //nombre de la tabla , estructura de la tabla

module.exports = model