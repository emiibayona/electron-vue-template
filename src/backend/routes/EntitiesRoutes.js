const controller = require("../controllers/EntitiesController");

const { Router } = require("express");
const router = Router();

module.exports = (app) => {
  app.use("/api/entities", router);

  router.post("/", controller?.create);
  router.get("/", controller?.getList);
  router.get("/:id", controller?.getById);
  //   router.put("/:id", controller.update);
  //   router.delete("/:id", controller.delete);
};
