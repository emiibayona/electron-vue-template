const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/database");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");

const app = express();
const port = 8081;

sequelize.sync();

function getRoutes() {
  fs?.readdirSync("./routes/")?.forEach((route) => {
    require(`./routes/${route.split(".")[0]}`)(app);
  });
}

function getUses() {
  app.use(morgan("combined"));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}

const initApp = async () => {
  console.log("Testing the database connection..");

  // Test the connection.
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    getUses();
    getRoutes();

    app.listen(port, () => {
      console.log(`Server is running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
