const { handleResponse } = require("../services/HandleResponse");

const controller = {};

controller.upload = async (req, res) => {
  return handleResponse(
    {
      value: {
        message: "File uploaded successfully",
        filePath: `${req.uploadPath}/${req.file.filename}`,
      },
    },
    res
  );
};
module.exports = controller;
