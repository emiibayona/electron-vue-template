const { STATUS, PEOPLE_TYPE } = require("../utils/constants");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    "Peoples",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      names: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastnames: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(STATUS),
        allowNull: false,
        defaultValue: "active",
      },
      type: {
        type: DataTypes.ENUM,
        values: Object.values(PEOPLE_TYPE),
        allowNull: false,
        defaultValue: "other",
      },
      addressId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Addresses",
          key: "id",
        },
        allowNull: true,
      },
    },
    {}
  );

  People.associate = function (models) {
    // associations can be defined here
    People.hasOne(models.Address, {
      foreignKey: "addressId",
      as: "address",
    });
  };

  return People;
};
