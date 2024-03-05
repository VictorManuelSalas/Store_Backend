const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");
const config = require("../config/config");
const app = express();

app.use(express.json());
app.use(cors("*"));

const connect = require("../database");
connect(config.dataBase.mongoURL);

routerApi(app);


app.listen(config.port, () => {
  console.log(`Server running in the port ${config.port}`);
});
