const express = require("express");
const router = express.Router();

//servcie
const ClientService = require("../services/clients");
const service = new ClientService();

const { uploadClient } = require("./imagens");

//validations Middlewares

//Schemas

router.get("/", async (req, res) => {
  const clients = await service.getClients();
  res.status(200).send({ clients });
});

router.post("/", uploadClient.single("photo"), async (req, res) => {
  const data = req.body;
  const photo = req.file;
  const client = await service.addClient(data, photo);
  res.send({
    response: client._id ? `New Client Added` : "Client not added",
    client,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await service.getClient(id);
  res.send({ response });
});

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   const deleteProcess = await service.deleteProduct(id);
//   const imgStatus = deleteProcess !== "object" ? await img_service.deleteImg(deleteProcess?.img) : "";
//   res.send({ deleteProcess, imgStatus});
// });

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const data = req.body;
//   const updateProduct = await service.updateProduct(id, data);
//   res.send({ updateProduct });
// });

module.exports = router;
