const mongoos = require("mongoose");

const Schema = mongoos.Schema; //obtener y almacenar el atributo de schema

//Aqui se define el schema de la tabla(campos)
const mySchema = new Schema({
  name: { type: String, requeried: true },
  description: { type: String, requeried: false },
  imagen: {
    small: { type: String, requeried: false },
    medium: { type: String, requeried: false },
    large: { type: String, requeried: false },
    original: { type: String, requeried: false },
  },
  category: { type: String, requeried: true },
  price: { type: Number, requeried: true },
  quantity: { type: Number, requeried: true },
});

const model = mongoos.model("products", mySchema); //nombre de la tabla , estructura de la tabla

module.exports = model;
