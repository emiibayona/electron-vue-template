const { DUE_STATUS } = require("../utils/constants");

module.exports = (sequelize, DataTypes) => {
  const Due = sequelize.define(
    "Due",
    {
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(DUE_STATUS),
        defaultValue: DUE_STATUS.PENDING,
      },
      payPlanId: {
        type: DataTypes.INTEGER,
        references: {
          model: "PayPlans",
          key: "id",
        },
        allowNull: false,
      },
    },
    { paranoid: false, timestamps: true }
  );

  return Due;
};
