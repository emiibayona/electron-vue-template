const controller = require("../controllers/PaymentsController");

const { Router } = require("express");
const router = Router();

module.exports = (app) => {
  app.use("/api/payments", router);

  router.post("/", controller?.create);
  router.get("/", controller?.getList);
  router.get("/:id", controller?.getById);
  router.get("/reports", controller?.getReports);
  router.delete("/:id", controller.delete);

  //   router.put("/:id", controller.update);
};
