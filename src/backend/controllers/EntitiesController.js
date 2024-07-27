const { handleResponse } = require("../services/HandleResponse");
const service = require("../services/EntitiesService");
const controller = {};

controller.create = async (req, res) => {
  const people = await service.create(req.body);
  return handleResponse(people, res);
};

controller.getList = async (req, res) => {
  return handleResponse(await service.getList(req.query), res);
};

controller.getById = async (req, res) => {
  const people = await service.getById(req.params.id);
  return handleResponse(people, res);
};

// controller.update = async (req, res) => {
//   const people = await service.update(req.params.id, req.body);
//   return handleResponse(people, res);
// };

// controller.delete = async (req, res) => {
//   const people = await service.delete(req.params.id);
//   return handleResponse(people, res);
// };

module.exports = controller;
