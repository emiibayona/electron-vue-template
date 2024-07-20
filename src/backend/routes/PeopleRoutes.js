// import model from "../models/People";
const controller = require("../controllers/PeoplesController");

// const express = require("express");
// const router = express.Router();
// express.use("/Peoples", router);
const { Router } = require("express");
const router = Router();

module.exports = (app) => {
  app.use("/api/Peoples", router);

  router.post("/", controller.create);
  router.get("/", controller.getList);
};
