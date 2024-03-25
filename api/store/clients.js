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

async function addNewClient(data) {
  try {
    const newClient = await new Model(data);
    return newClient.save();
  } catch (error) {
    console.log(error);
  }
}

async function updateClient(id, data) {
  const updateClient = await Model.updateOne({ _id: id }, { $set: data });

  if (updateClient.matchedCount !== 0) {
    return { message: "Client was updated correctly" };
  } else {
    return { message: "Client not exist, verify the id" };
  }
}

async function deleteProduct(id) {
  try {
    const client = await Model.findOne({ _id: id });

    if (client) {
      const process = await Model.deleteOne({ _id: id });
      return await { process, photo: client?.photo };
    } else {
      return "Client not exist";
    }
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAll: getClients,
  getById: getClientById,
  add: addNewClient,
  update: updateClient,
  delete: deleteProduct,
};
