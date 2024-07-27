const { Due, PayPlan } = require("../config/database");
const { withTryCatch } = require("../utils/tryCatch");
const { WrapResults, ResultError } = require("./HandleResponse");

const service = {};

service.create = withTryCatch(
  async function (data) {
    if (!data) {
      return ResultError("Invalid data");
    }
    return WrapResults(await Due.create(data));
  },
  {
    error: "Error while creating Due",
  }
);

service.bulkCreate = withTryCatch(
  async function (bulk) {
    if (bulk?.length === 0) return;
    return WrapResults(await Due.bulkCreate(bulk));
  },
  {
    error: "Error while creating Dues",
  }
);

service.findById = withTryCatch(
  async function (id) {
    return WrapResults(
      await Due.findByPk(id, {
        include: [{ model: PayPlan }],
      })
    );
  },
  { error: "Error while getting Due" }
);

service.payDue = withTryCatch(
  async function (id, transaction = null) {
    let interTrans = transaction;
    if (!interTrans) interTrans = await sequelize.transaction();
    if (!id) return ResultError("Invalid Due ID");
    const due = await Due.findByPk(id);
    if (due.DUE_STATUS === DUE_STATUS.PAID) {
      if (!transaction) {
        await interTrans.rollback();
      }
      return ResultError("Due is already Paid");
    }
    await service.update(
      id,
      { status: DUE_STATUS.PAID },
      { transaction: interTrans }
    );

    if (!transaction) {
      await interTrans.commit();
    }
    return WrapResults({ message: "Due Paid Successfully" });
  },
  { error: "Error while paying Due" }
);

service.getList = withTryCatch(
  async function (query) {
    return WrapResults([]);
  },
  { error: "Error while getting Due List" }
);

service.update = withTryCatch(
  async function (id, body) {
    return WrapResults(await Due.update(body, { where: { id } }));
  },
  { error: "Error while updating Due" }
);

service.delete = withTryCatch(
  async function (id) {
    return WrapResults(await Due.destroy({ where: { id } }));
  },
  {
    error: "Error while deleting Due",
  }
);

module.exports = service;
