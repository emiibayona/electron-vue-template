const { STATUS } = require("../utils/constants");

module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define(
    "Center",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(STATUS),
        allowNull: true,
        defaultValue: "active",
      },
      addressId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Addresses", // Note: This should match the table name for People
          key: "id",
        },
        allowNull: false,
      },
    },
    { paranoid: true, timestamps: true }
  );

  return Center;
};
