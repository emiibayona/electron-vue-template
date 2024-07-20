module.exports = (sequelize, DataTypes) => {
  const PayPlan = sequelize.define(
    "PayPlan",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      dues: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
      frequency: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
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
