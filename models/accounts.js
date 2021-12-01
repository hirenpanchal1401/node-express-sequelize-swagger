"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accounts.hasMany(models.Transactions);
    }
  }
  Accounts.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      balance: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      address: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      mobile: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      idNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      idName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Accounts",
    }
  );
  return Accounts;
};
