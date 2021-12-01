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
 * Creates New Account
 * @param { name, balance, address, mobile, idNumber, idName, type } req
 * @param { account } res
 */
export const createAccount = async (req, res) => {
  try {
    const tx = await sequelize.transaction({ autocommit: false });
    try {
      const { name, balance, address, mobile, idNumber, idName, type } =
        req.body;

      const account = await Accounts.create(
        {
          name,
          balance: Number(Number(balance).toFixed(4)),
          address,
          mobile,
          idNumber,
          idName,
          type,
          status: true,
        },
        { transaction: tx }
      );

      // New TransactionID
      const traId = await newTId();
      const transaction = await Transactions.create(
        {
          accountId: account.id,
          amount: Number(Number(balance).toFixed(4)),
          balance: Number(Number(balance).toFixed(4)),
          transactionId: traId,
          description: name,
          type: "CREDIT",
        },
        { transaction: tx }
      );

      await tx.commit();

      account = await Accounts.findOne({
        where: { id: account.id },
        include: [
          {
            model: Transactions,
          },
        ],
      });

      return successResponse(req, res, { account });
    } catch (error) {
      await tx.rollback();
      console.log(error);
      return errorResponse(req, res, error.message, 500);
    }
  } catch (err) {
    return errorResponse(req, res, err.message, 500);
  }
};

/**
 * Fetch Account Details For Given accountId
 * @param { id } req
 * @param { account } res
 */
export const fetchAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await Accounts.findOne({
      where: { id },
    });

    if (!account) {
      return errorResponse(req, res, "Account Not Found!", 400);
    }

    return successResponse(req, res, { account });
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

/**
 * Fetch Wallet Details For Given WalletID
 * @param { } req
 * @param { accounts } res
 */
export const fetchAllAccounts = async (req, res) => {
  try {
    const accounts = await Accounts.findAll({
      order: [["createdAt", "ASC"]],
    });
    return successResponse(req, res, { accounts });
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
