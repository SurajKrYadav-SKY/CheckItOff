const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const connect = require("./config/db");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log("Server started at port:", PORT);
  await connect();
  console.log("MongoDB connected");
});
