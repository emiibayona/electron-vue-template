const { Center, Address } = require("../config/database");
const { withTryCatch } = require("../utils/tryCatch");
const { WrapResults, ResultError } = require("../services/HandleResponse");
const AddressService = require("./AddressService");

const service = {};

service.create = withTryCatch(
  async function (data) {
    const center = await Center.findOne({ where: { name: data.name } });
    if (center) return ResultError("Center already exists");
    if (data.address) {
      const res = await AddressService.findOrCreate(data.address);
      data.addressId = res?.value?.id;
    }
    return WrapResults(await Center.create(data));
  },
  {
    error: "Error while creating Center",
  }
);

service.findById = withTryCatch(
  async function (id) {
    return WrapResults(
      await Center.findByPk(id, {
        include: [{ model: Address }],
      })
    );
  },
  { error: "Error while getting Center" }
);

service.getList = withTryCatch(
  async function (query) {
    const addressInclude = { model: Address };
    const where = {};
    if (query.name) {
      where.name = { [Sequelize.Op.iLike]: `%${query.name}%` };
    }
    if (query.status) {
      where.status = query.status;
    }
    if (query.addressId) {
      where.addressId = query.addressId;
    }
    if (query.city) {
      addressInclude.where = { city: query.city };
    }
    return WrapResults(
      await Center.findAll({ where, include: [addressInclude] })
    );
  },
  { error: "Error while getting Center List" }
);

service.update = withTryCatch(
  async function (id, body) {
    return WrapResults(await Center.update(body, { where: { id } }));
  },
  { error: "Error while updating Center" }
);

service.delete = withTryCatch(
  async function (id) {
    return WrapResults(await Center.destroy({ where: { id } }));
  },
  {
    error: "Error while deleting Center",
  }
);

module.exports = service;
