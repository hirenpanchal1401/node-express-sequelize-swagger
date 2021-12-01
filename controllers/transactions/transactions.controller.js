import { Accounts, Transactions, sequelize } from "../../models/index";
import {
  successResponse,
  errorResponse,
  transactionId,
} from "../../helpers/index";

/**
 * Creates Unique TransactionID
 * @param
 * @param Promise
 */
const newTId = async () => {
  try {
    let transactionData = true;
    let tId = null;

    while (transactionData) {
      tId = String(transactionId());
      transactionData = await Transaction.findOne({
        where: { transactionId: tId },
        attributes: ["transactionId"],
      });
    }

    return Promise.resolve(tId);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Creates New Transaction On Existing Account
 * @param { amount, description, accountId } req
 * @param { transaction } res
 */
export const createTransaction = async (req, res) => {
  try {
    const tx = await sequelize.transaction({ autocommit: false });
    try {
      const { amount, description, accountId } = req.body;

      const account = await Accounts.findOne({
        where: { id: accountId },
      });

      if (!account) {
        await tx.rollback();
        return errorResponse(req, res, "Account Not Found!", 400);
      }

      // New TransactionID
      const traId = await newTId();

      let transaction = await Transactions.create(
        {
          accountId: account.id,
          amount: Number(Number(amount).toFixed(4)),
          balance: Number(
            Number(Number(account.balance).toFixed(4)) +
              Number(Number(amount).toFixed(4))
          ).toFixed(4),
          transactionId: traId,
          description,
          type: amount > 0 ? "CREDIT" : "DEBIT",
        },
        { transaction: tx }
      );

      await Accounts.update(
        {
          balance: Number(
            Number(Number(account.balance).toFixed(4)) +
              Number(Number(amount).toFixed(4))
          ).toFixed(4),
        },
        {
          where: { id: account.id },
          transaction: tx,
        }
      );

      await tx.commit();

      transaction = await Transactions.findOne({
        where: { id: transaction.id },
        include: [
          {
            model: Accounts,
          },
        ],
      });

      return successResponse(req, res, { transaction });
    } catch (error) {
      await tx.rollback();
      return errorResponse(req, res, error.message, error.code || 500);
    }
  } catch (err) {
    return errorResponse(req, res, err.message, 500);
  }
};

/**
 * Fetch Transactions For Given Account
 * @param { accountId, skip, limit } req
 * @param { transactions } res
 */
export const fetchTransactions = async (req, res) => {
  try {
    let { skip, limit } = req.query;
    let { accountId } = req.params;

    const account = await Accounts.findOne({
      where: { id: accountId },
    });

    if (!account) {
      return errorResponse(req, res, "Account Not Found!", 400);
    }

    skip = skip ? (isNaN(skip) ? 0 : parseInt(skip)) : 0;
    limit = limit ? (isNaN(limit) ? 100 : parseInt(limit)) : 100;

    const transactions = await Transactions.findAll({
      where: { accountId },
      offset: skip,
      limit,
      order: [["createdAt", "ASC"]],
    });

    return successResponse(req, res, { transactions });
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
