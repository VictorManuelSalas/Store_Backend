//Logica de almacenamiento a la db

const Model = require("../schemas/clients");

async function getClients() {
  const clients = await Model.find();
  console.log(clients);
  return clients;
}

async function getClientById(id) {
  const client = await Model.findOne({ _id: id });
  if (client) {
    return await client;
  } else {
    return "Client not exist";
  }
}

async function addNewClient(data){
  const newClient = await new Model(data)
  return newClient
}

module.exports = {
  getAll: getClients,
  getById: getClientById,
  add: addNewClient
};
