const { People, Address } = require("../config/database");
const service = {};

service.create = async (data) => {
  return await Address.create(
    data || {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    }
  );
};
service.getList = async function (query) {
  return await Address.findAll();
};

module.exports = service;
