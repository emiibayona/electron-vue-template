const { People, Address, Center, Op } = require("../config/database");
const AddressService = require("./AddressService");
const CenterService = require("./CentersService");
const PayPlansService = require("./PayPlansService");
const { withTryCatch } = require("../utils/tryCatch");
const { WrapResults, ResultError } = require("../services/HandleResponse");
const { withLimit } = require("../utils/querying");

const service = {};

function getIncludes({ address, center }) {
  const includes = [];

  if (address) {
    includes.push({ model: Address });
  }
  if (center) {
    includes.push({ model: Center });
  }
  return includes;
}

service.create = withTryCatch(
  async function (data) {
    const pip = await People.findOne({ where: { email: data.email } });

    if (pip) {
      return ResultError({ error: "Email already exists" });
    }

    if (data.address) {
      const prevAdd = await AddressService.findOrCreate(data.address);
      data.addressId = prevAdd?.value?.id;
    }

    const people = await People.create(data);

    await service.associateCenter({
      peopleId: people.id,
      centerId: data?.centerId,
    });

    await service.associatePayPlan({
      payPlan: data.payPlan,
      peopleId: people.id,
      centerId: data?.centerId,
    });

    return WrapResults(people);
  },
  { error: "Error while creating a new people" }
);

service.associateCenter = withTryCatch(
  async function ({ people, centerId }) {
    const center = await CenterService.findById(centerId);
    if (center?.value) {
      await people.addCenters(center?.value, {
        through: { selfGranted: false },
      });
      return WrapResults({ message: "Center associated successfully" });
    } else {
      return ResultError({ error: "Center not found" });
    }
  },
  { error: "Error while associating center to people" }
);

service.associatePayPlan = withTryCatch(
  async function ({ payPlan, peopleId, centerId }) {
    const plan = await PayPlansService.findById(payPlan?.id);
    if (plan?.value) {
      await PayPlansService.update(payPlan?.id, payPlan);
    } else {
      await PayPlansService.create({
        ...payPlan,
        peopleId,
        centerId,
      });
    }
  },
  { error: "Error while associating pay plan to people" }
);

service.getList = withTryCatch(
  async function (query) {
    const search = query?.search || "";
    return WrapResults(
      await People.findAndCountAll({
        where: {
          names: { [Op.like]: `%${search}%` },
          lastnames: { [Op.like]: `%${search}%` },
          email: { [Op.like]: `%${search}%` },
        },
        include: getIncludes({ center: true, address: true, payPlan: true }),
        ...withLimit(query),
      })
    );
  },
  { error: "Error while fetching people list" }
);

service.findById = withTryCatch(
  async function (id) {
    return WrapResults(
      await People.findByPk(id, {
        include: getIncludes({ center: true, address: true }),
      })
    );
  },
  { error: "Error while getting people" }
);

service.update = withTryCatch(
  async function (id, body) {
    let pip = await service.findById(id);
    if (!pip?.value) {
      return ResultError({ error: "People not found" });
    }
    pip = pip?.value;

    if (body.payPlan) {
      await service.associatePayPlan({
        payPlan: body.payPlan,
        peopleId: pip?.id,
        centerId: body?.centerId,
      });
    }

    if (body.centerId) {
      await service.associateCenter({
        people: pip,
        centerId: body?.centerId,
      });
    }

    return WrapResults(await People.update(body, { where: { id } }));
  },
  { error: "Error while updating people" }
);

service.delete = withTryCatch(
  async function (id) {
    return WrapResults(await People.destroy({ where: { id } }));
  },
  {
    error: "Error while deleting people",
  }
);

service.deleteByDni = withTryCatch(
  async function (dni) {
    return WrapResults(await People.destroy({ where: { dni } }));
  },
  {
    error: "Error while deleting people",
  }
);
module.exports = service;
