const controller = require("../controllers/FilesController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { Router } = require("express");
const router = Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const mainFolder = "uploads/";
    const subFolder = `uploads/${req?.query?.folder || ""}`;

    [mainFolder, subFolder].forEach((fol) => {
      if (!fs.existsSync(fol)) {
        fs.mkdirSync(fol);
      }
    });
    req.uploadPath = req?.query?.folder ? subFolder : mainFolder;
    cb(null, req.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = (app) => {
  app.use("/api/files", router);
  router.post("/", upload.single("file"), controller.upload);
};
