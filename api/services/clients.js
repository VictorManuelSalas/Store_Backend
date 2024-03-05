const store = require("../store/clients");

class ClientService {
  constructor() {}

  async getClients() {
    return await store.getAll();
  }

  async getClient(id) {
    try {
      return await store.getById(id);
    } catch (error) {
      return error;
    }
  }

  async addClient(data, photo) {
    try { 
      if (
        data.name == "" ||
        data.lastname == "" ||
        data.email == "" ||
        data.phone == "" ||
        data.address == ""
      ) {
        return "Datos Faltantes";
      }

      data.photo = `https://store-backend-3his.onrender.com/api/v1/imagen/${photo?.filename}`;

      return store.add(data);
    } catch (error) {
      return error;
    }
  }
}

module.exports = ClientService;
