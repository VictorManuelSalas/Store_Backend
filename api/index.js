const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");
const config = require("../config/config");
const app = express();

// Lista de IPs permitidas
const allowedIps = ["123.45.67.89", "98.76.54.32", "127.0.0.1"];

// Middleware para validar IP
app.use((req, res, next) => {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("IP Request => " ,clientIp);
  if (allowedIps.includes(clientIp)) {
    next();
  } else {
    res.status(403).json({ message: "Access denied: IP not allowed" });
  }
});

app.use(express.json());
app.use(cors());

const connect = require("../database");
connect(config.dataBase.mongoURL);

routerApi(app);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
