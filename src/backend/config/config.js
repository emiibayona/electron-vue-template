const path = require("path");

module.exports = {
  development: {
    username: "root",
    password: "root",
    database: path.join(__dirname, "database.sqlite"),
    host: "localhost",
    dialect: "sqlite",
    logging: true,
    operatorsAliases: false,
  },
};
