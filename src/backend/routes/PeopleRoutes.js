const controller = require("../controllers/PeoplesController");

const { Router } = require("express");
const router = Router();

module.exports = (app) => {
  app.use("/api/Peoples", router);

  router.post("/", controller.create);
  router.get("/", controller.getList);
};
