const { PAYMENT_METHOD, PAYMENT_TYPE } = require("../utils/constants");

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payentMethod: {
        type: DataTypes.ENUM,
        values: Object.values(PAYMENT_METHOD),
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.ENUM,
        values: Object.values(PAYMENT_TYPE),
        allowNull: false,
      },
      centerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Centers",
          key: "id",
        },
        allowNull: true,
      },
      peopleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Peoples",
          key: "id",
        },
        allowNull: true,
      },
      entityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Entities",
          key: "id",
        },
        allowNull: true,
      },
      dueId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Dues",
          key: "id",
        },
        allowNull: true,
      },
    },
    { paranoid: false, timestamps: true }
  );

  return Payment;
};
