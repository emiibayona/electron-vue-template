const { STATUS } = require("../utils/constants");

("use strict");
module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define(
    "Entity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rut: {
        type: DataTypes.STRING,
        allowNull: true,
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
      addressId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Addresses",
          key: "id",
        },
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
    },
    {}
  );

  Entity.associate = function (models) {
    // associations can be defined here
    Entity.hasOne(models.Address, {
      foreignKey: "addressId",
      as: "address",
    });
  };

  return Entity;
};
