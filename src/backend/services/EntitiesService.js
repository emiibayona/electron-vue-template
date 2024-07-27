const { Entity, Address } = require("../config/database");
const { withTryCatch } = require("../utils/tryCatch");
const { WrapResults, ResultError } = require("../services/HandleResponse");
const AddressService = require("./AddressService");

const service = {};

service.create = withTryCatch(
  async function (data) {
    const center = await Entity.findOne({ where: { name: data.name } });
    if (center) return ResultError("Entity already exists");
    if (data.address) {
      const res = await AddressService.findOrCreate(data.address);
      data.addressId = res?.value?.id;
    }
    return WrapResults(await Entity.create(data));
  },
  {
    error: "Error while creating Entity",
  }
);

service.findById = withTryCatch(
  async function (id) {
    return WrapResults(
      await Entity.findByPk(id, {
        include: [{ model: Address }],
      })
    );
  },
  { error: "Error while getting Entity" }
);

service.getList = withTryCatch(
  async function (query) {
    const addressInclude = { model: Address };
    const where = {};
    if (query.name) {
      where.name = { [Sequelize.Op.iLike]: `%${query.name}%` };
    }
    if (query.status) {
      where.addressId = query.status;
    }
    if (query.addressId) {
      where.addressId = query.addressId;
    }
    if (query.city) {
      addressInclude.where = { city: query.city };
    }
    return WrapResults(
      await Entity.findAll({ where, include: [addressInclude] })
    );
  },
  { error: "Error while getting Entity List" }
);

service.update = withTryCatch(
  async function (id, body) {
    return WrapResults(await Entity.update(body, { where: { id } }));
  },
  { error: "Error while updating Entity" }
);

service.delete = withTryCatch(
  async function (id) {
    return WrapResults(await Entity.destroy({ where: { id } }));
  },
  {
    error: "Error while deleting Entity",
  }
);

module.exports = service;
