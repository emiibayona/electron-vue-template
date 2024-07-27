const { Address } = require("../config/database");
const { withTryCatch } = require("../utils/tryCatch");
const { ResultError, WrapResults } = require("./HandleResponse");
const service = {};

service.create = withTryCatch(
  async function (data) {
    if (!data) {
      return ResultError({ error: "Data is required" });
    }
    return WrapResults(await Address.create(data));
  },
  { error: "Error while creating a new address" }
);

service.getList = withTryCatch(
  async function (query) {
    const search = query?.search || "";
    return WrapResults(
      await Address.findAndCountAll({
        where: {
          street_1: { [Op.like]: `%${search}%` },
          street_2: { [Op.like]: `%${search}%` },
          state: { [Op.like]: `%${search}%` },
          city: { [Op.like]: `%${search}%` },
          country: { [Op.like]: `%${search}%` },
          postalCode: { [Op.like]: `%${search}%` },
        },
        ...withLimit(query),
      })
    );
  },
  { error: "Error while fetching Address list" }
);

service.getById = withTryCatch(
  async function (id) {
    if (!id) return ResultError({ error: "Missing id" });
    return WrapResults(await Address.findByPk(id));
  },
  {
    error: "Error while getting Address",
  }
);

service.getByParams = withTryCatch(
  async function (params) {
    return WrapResults(await Address.findOne({ where: params }));
  },
  {
    error: "Error while getting Address by params",
  }
);

service.findOrCreate = withTryCatch(
  async function (params) {
    let prevAdd = await service.getByParams({
      street_1: params.street_1,
      street_2: params.street_2,
      city: params.city,
      state: params.state,
      country: params.country,
    });

    if (!prevAdd?.value) {
      prevAdd = await service.create(params);
    }
    return prevAdd;
  },
  {
    error: "Error while finding or creating Address",
  }
);

module.exports = service;
