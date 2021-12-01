"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          id: 1,
          name: "John Doe",
          balance: 100,
          address: "Surat Gujarat India",
          mobile: 9532898978,
          idNumber: "ELC84379",
          idName: "Election ID",
          type: "SAVING",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Hiren Panchal",
          balance: 500,
          address: "Ahmedabad Gujarat India",
          mobile: 9532894658,
          idNumber: "ELC36565",
          idName: "Election ID",
          type: "SAVING",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
