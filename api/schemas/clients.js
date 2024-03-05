const mongoos = require("mongoose");

const Schema = mongoos.Schema; //obtener y almacenar el atributo de schema

//Aqui se define el schema de la tabla(campos)
const mySchema = new Schema({
  name: { type: String, requeried: true },
  lastname: { type: String, requeried: true },
  photo: { type: String, requeried: false },
  email: { type: String, requeried: true },
  phone: { type: Number, requeried: true },
  address: { type: String, requeried: true },
});

const model = mongoos.model("clients", mySchema); //nombre de la tabla , estructura de la tabla

module.exports = model;
