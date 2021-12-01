/* eslint-disable no-extend-native */
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const cluster = require("cluster");

dotenv.config();

const app = express();
app.use(compression());
app.set("port", process.env.APP_PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);
app.use("/", routes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bank APIs",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Hiren D. Panchal",
        url: "http://www.hirenpanchal.com",
        email: "hirenpanchal1401@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["swagger.js"],
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

if (cluster.isMaster && process.env.NODE_ENV === "production") {
  const numWorkers = require("os").cpus().length;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i += 1) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  app.listen(process.env.APP_PORT, () => {
    console.log(
      `Process ${process.pid} is listening to all incoming requests.Server running on port ${process.env.APP_PORT}`
    );
  });
}
