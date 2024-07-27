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
      paymentMethod: {
        type: DataTypes.ENUM,
        values: Object.values(PAYMENT_METHOD),
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.ENUM,
        values: Object.values(PAYMENT_TYPE),
        allowNull: false,
      },
      invoice: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: false,
      },
    },
    { paranoid: false, timestamps: true }
  );
  return Payment;
};
