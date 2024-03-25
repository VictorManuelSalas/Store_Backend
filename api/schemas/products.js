const mongoos = require("mongoose");

const Schema = mongoos.Schema; //obtener y almacenar el atributo de schema

//Aqui se define el schema de la tabla(campos)
const mySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  imagen: {
    small: { type: String, required: false },
    medium: { type: String, required: false },
    large: { type: String, required: false },
    original: { type: String, required: false },
  },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const model = mongoos.model("products", mySchema); //nombre de la tabla , estructura de la tabla

module.exports = model;
