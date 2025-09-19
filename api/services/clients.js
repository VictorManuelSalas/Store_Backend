const store = require("../store/clients");
const { production } = require("../../config/config");
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
      data.photo = production == 'true'
        ? `https://store-backend-3his.onrender.com/api/v1/imagen/clientImg/${photo?.filename}`
        : `http://localhost:3001/api/v1/imagen/clientImg/${photo?.filename}`;
      return store.add(data);
    } catch (error) {
      return error;
    }
  }

  async updateClient(id, data) {
    try {
      return await store.update(id, data);
    } catch (error) {
      return error;
    }
  }
  async deleteContact(id) {
    try {
      return await store.delete(id);
    } catch (error) {
      return error;
    }
  }
}

module.exports = ClientService;
