const { PayPlan, Due, Center, People } = require("../config/database");
const { withTryCatch } = require("../utils/tryCatch");
const { WrapResults, ResultError } = require("./HandleResponse");
const DuesService = require("./DuesService");
const CentersService = require("./CentersService");
const moment = require("moment");

const service = {};

service.create = withTryCatch(
  async function (data) {
    if (!data.centerId) {
      return ResultError("Center is required");
    }

    const center = await CentersService.findById(data.centerId);
    if (!center?.value) {
      return ResultError("Center not found");
    }

    if (data.peopleId) {
      const personIsAssociated =
        await PeopleService.isPersonAssociatedWithCenter(
          data.peopleId,
          data.centerId
        );
      if (!personIsAssociated.success || personIsAssociated.value === false) {
        return ResultError("Person is not associated with the center");
      }
    }

    // TODO: Check if the start date is in the future ??????

    if (data.startDate) {
      data.endDate = moment(data.startDate).add(data.dues, "months");
    }

    const plan = await PayPlan.create(data);

    const bulk = [];
    for (let i = 0; i < data.dues; i++) {
      bulk.push({
        payPlanId: plan.id,
        amount: data.amount / data.dues,
        description: `Due ${i + 1}/${data.dues}`,
      });
    }
    const resDues = await DuesService.bulkCreate(bulk);
    if (!resDues.success) {
      return resDues;
    }
    return WrapResults({ ...plan.dataValues, dues: bulk });
  },
  {
    error: "Error while creating PayPlan",
  }
);

service.findById = withTryCatch(
  async function (id) {
    return WrapResults(
      await PayPlan.findByPk(id, {
        include: [],
      })
    );
  },
  { error: "Error while getting PayPlan" }
);

service.getList = withTryCatch(
  async function (query) {
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
      await PayPlan.findAll({
        where,
        include: [{ model: Due }, { model: Center }, { model: People }],
      })
    );
  },
  { error: "Error while getting PayPlan List" }
);

service.update = withTryCatch(
  async function (id, body) {
    return WrapResults(await PayPlan.update(body, { where: { id } }));
  },
  { error: "Error while updating PayPlan" }
);

service.delete = withTryCatch(
  async function (id) {
    return WrapResults(await PayPlan.destroy({ where: { id } }));
  },
  {
    error: "Error while deleting PayPlan",
  }
);

module.exports = service;
