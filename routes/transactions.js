import express from "express";
import { validate } from "express-validation";

import {
  createTransaction,
  fetchTransactions,
} from "../controllers/transactions/transactions.controller";
import {
  validateCreateTransaction,
  validateFetchTransactions,
} from "../controllers/transactions/transactions.validator";

const router = express.Router();

router.post("/", validate(validateCreateTransaction), createTransaction);

router.get(
  "/:accountId",
  validate(validateFetchTransactions),
  fetchTransactions
);

module.exports = router;
