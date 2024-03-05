const mongoos = require("mongoose");

const Schema = mongoos.Schema; //obtener y almacenar el atributo de schema

//Aqui se define el schema de la tabla(campos)
const mySchema = new Schema({
  name: { type: String, requeried: false },
  lastname: { type: String, requeried: false },
  photo: { type: String, requeried: false },
  email: { type: String, requeried: false },
  phone: { type: Number, requeried: false },
  address: { type: String, requeried: false },
});

const model = mongoos.model("clients", mySchema); //nombre de la tabla , estructura de la tabla

module.exports = model;
