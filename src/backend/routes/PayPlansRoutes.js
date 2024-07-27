const controller = require("../controllers/PayPlansController");

const { Router } = require("express");
const router = Router();

module.exports = (app) => {
  app.use("/api/payplans", router);

  router.post("/", controller?.create);
  router.get("/", controller?.getList);
  router.get("/:id", controller?.getById);
  //   router.put("/:id", controller.update);
  //   router.delete("/:id", controller.delete);
};
