import express from "express";
import accountRoutes from "./accounts";
import transactionRoutes from "./transactions";

const app = express();

app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

module.exports = app;
