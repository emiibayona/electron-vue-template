module.exports = (sequelize, DataTypes) => {
  const PayPlan = sequelize.define(
    "PayPlan",
    {
      dues: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      startDate: { type: DataTypes.DATE, allowNull: false },
      frequency: { type: DataTypes.INTEGER, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
      centerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Centers",
          key: "id",
        },
        allowNull: false,
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
    },
    { paranoid: false, timestamps: true }
  );

  return PayPlan;
};
