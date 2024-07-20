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
