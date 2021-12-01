"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Transactions",
      [
        {
          id: 1,
          accountId: 1,
          amount: 30,
          balance: 30,
          transactionId: "1638357252796290",
          description: "Initial Amount",
          type: "CREDIT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          accountId: 1,
          amount: 150,
          balance: 180,
          transactionId: "1638357384725353",
          description: "First Transaction",
          type: "CREDIT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          accountId: 1,
          amount: -80,
          balance: 100,
          transactionId: "1638357452839549",
          description: "Second Transaction",
          type: "DEBIT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          accountId: 2,
          amount: 500,
          balance: 500,
          transactionId: "1638357510491835",
          description: "Initial Amount",
          type: "CREDIT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
