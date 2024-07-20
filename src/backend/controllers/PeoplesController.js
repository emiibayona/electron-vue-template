const { handleResponse } = require("../services/HandleResponse");
const service = require("../services/PeoplesService");
const controller = {};

controller.create = async (req, res) => {
  const people = await service.create(req.body);
  return handleResponse(people, res);
};

controller.getList = async (req, res) => {
  return handleResponse(await service.getList(), res);
};

module.exports = controller;
