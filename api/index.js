const express = require("express");
const cors = require("cors");
const ipRangeCheck = require("ip-range-check");

const routerApi = require("./routes");
const config = require("../config/config");
const app = express();

const allowedCidrs = [
  "136.143.160.0/19",
  "135.84.80.0/22",
  "165.173.128.0/18",
  "204.141.32.0/23",
  "204.141.42.0/23",
  "65.154.166.0/24",
];

// Middleware para validar IPs
app.use((req, res, next) => {
  // Toma la IP real (si hay proxy usa x-forwarded-for)
  let clientIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Normaliza IPs tipo "::ffff:127.0.0.1"
  if (clientIp.startsWith("::ffff:")) {
    clientIp = clientIp.replace("::ffff:", "");
  }

  if (ipRangeCheck(clientIp, allowedCidrs)) {
    next();
  } else {
    console.warn(`🚫 Bloqueada petición desde IP no permitida: ${clientIp}`);
    return res.status(403).json({ message: "Access denied: IP not allowed" });
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
