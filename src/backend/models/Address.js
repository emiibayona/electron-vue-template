module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
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
        allowNull: false,
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
