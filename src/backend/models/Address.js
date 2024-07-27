module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      street_1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street_2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      houseNumber: { type: DataTypes.STRING, allowNull: true },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { paranoid: true, timestamps: true }
  );

  return Address;
};
