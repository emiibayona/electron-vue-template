const express = require("express");
const cors = require("cors");
const { sequelize } = require("./config/database");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8081;

sequelize.sync();

function getRoutes() {
  fs?.readdirSync("./routes/")?.forEach((route) => {
    console.log(`Loading route: ${route}`);
    require(`./routes/${route.split(".")[0]}`)(app);
  });
}

function getUses() {
  try {
    console.log("Loading middleware...");
    app.use(morgan("combined"));
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // Expose the uploads directory for file uploads.
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    console.log("Middleware loaded successfully.");
  } catch (error) {
    console.error("Error loading middleware:", error);
  }
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
