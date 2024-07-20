const { People, Address, sequelize, Sequelize } = require("../config/database");
const AddressService = require("./AddressService");
const { withTryCatch } = require("../utils/tryCatch");
const { ResultOk } = require("../services/HandleResponse");

const service = {};

service.create = withTryCatch(
  async function (data) {
    return ResultOk(await People.create(data));
  },
  { error: "Error while creating a new people" }
);

service.getList = withTryCatch(
  async function (query) {
    return ResultOk(await People.findAll({ include: [{ model: Address }] }));
  },
  { error: "Error while fetching people list" }
);

module.exports = service;
