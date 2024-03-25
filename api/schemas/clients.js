const mongoos = require("mongoose");

const Schema = mongoos.Schema; //obtener y almacenar el atributo de schema

//Aqui se define el schema de la tabla(campos)
const mySchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  photo: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: false },
  password: { type: String, required: true },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date}
}); 

const model = mongoos.model("clients", mySchema); //nombre de la tabla , estructura de la tabla

module.exports = model;
