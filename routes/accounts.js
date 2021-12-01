import express from "express";
import { validate } from "express-validation";

import {
  createAccount,
  fetchAccount,
  fetchAllAccounts,
} from "../controllers/accounts/accounts.controller";
import {
  validateCreateAccount,
  validateFetchAccount,
} from "../controllers/accounts/accounts.validator";

const router = express.Router();

router.post("/", validate(validateCreateAccount), createAccount);
router.get("/:id", validate(validateFetchAccount), fetchAccount);
router.get("/", fetchAllAccounts);

module.exports = router;
