const {
  Payment,
  Address,
  Due,
  Center,
  Entity,
  People,
} = require("../config/database");
const { withTryCatch } = require("../utils/tryCatch");
const { WrapResults, ResultError } = require("./HandleResponse");
const DuesService = require("./DuesService");
const CentersService = require("./CentersService");
const { PAYMENT_METHOD, PAYMENT_TYPE } = require("../utils/constants");
const fs = require("fs");

const service = {};

function getIncludes({ center, entity, people }) {
  const includes = [{ model: Due }];

  if (center) includes.push({ model: Center, require: false });
  if (entity) includes.push({ model: Entity, require: false });
  if (people) includes.push({ model: People, require: false });

  return includes;
}

service.create = async function (data) {
  const transaction = await sequelize.transaction();
  try {
    if (!data.dueId) {
      return ResultError("Due is required");
    }
    if (data.centerId) {
      const center = await CentersService.findById(data.centerId);
      if (!center?.success) return ResultError("Center not found");
    }

    if (data.entityId) {
      const entity = await EntityService.findById(data.entityId);
      if (!entity?.success) return ResultError("Entity not found");
    }

    if (data.peopleId) {
      const people = await PeopleService.findById(data.peopleId);
      if (!people?.success) return ResultError("People not found");
    }

    if (
      data.paymenType &&
      !Object.values(PAYMENT_TYPE).includes(data.paymenType)
    ) {
      return ResultError("Invalid payment type");
    }

    if (
      data.paymentMethod &&
      !Object.values(PAYMENT_METHOD).includes(data.paymentMethod)
    ) {
      return ResultError("Invalid payment method");
    }

    const payDue = await DuesService.payDue(payment.dueId, transaction);
    if (!payDue?.success) {
      await transaction.rollback();
      return payDue;
    }

    const payment = await Payment.create(data);

    await transaction.commit();
    return WrapResults(payment);
  } catch (error) {
    await transaction.rollback();
    return ResultError({ error: "Error while creating Payment" });
  }
};

service.findById = withTryCatch(
  async function (id) {
    return WrapResults(
      await Payment.findByPk(id, {
        include: [
          { model: Due },
          { model: Center, required: false },
          { model: Entity, required: false },
          { model: People, required: false },
        ],
      })
    );
  },
  { error: "Error while getting Payment" }
);

service.getList = withTryCatch(
  async function (query) {
    const where = {};

    if (query.centerId) where.centerId = query.centerId;
    if (query.entityId) where.entityId = query.entityId;
    if (query.peopleId) where.peopleId = query.peopleId;
    if (query.dueId) where.dueId = query.dueId;
    if (query.method) where.paymentMethod = query.paymentMethod;
    if (query.type) where.paymentType = query.paymentType;

    return WrapResults(
      await Payment.findAll({
        where,
        include: getIncludes({ center: true, entity: true, people: true }),
      })
    );
  },
  { error: "Error while getting Payment List" }
);
6;
service.update = withTryCatch(
  async function (id, body) {
    return WrapResults(await Payment.update(body, { where: { id } }));
  },
  { error: "Error while updating Payment" }
);

service.delete = withTryCatch(
  async function (id) {
    const payment = await service.findById(id);
    if (payment.success) {
      await DuesService.delete(payment.dueId);
    }

    const uploadDir = path.join(path.dirname(__dirname, "uploads"), "uploads");
    fs.unlinkSync(path.join(uploadDir, payment.invoice));

    return WrapResults(await Payment.destroy({ where: { id } }));
  },
  {
    error: "Error while deleting Payment",
  }
);

service.getReports = withTryCatch(
  async function () {
    return WrapResults([]);
  },
  { error: "Error while getting reports" }
);

module.exports = service;
