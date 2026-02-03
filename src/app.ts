import express from "express";
import routes from "./routes";
import requestLogger from "./middleware/requestLogger";
import errorHandler from "./middleware/errorHandler";

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(requestLogger);

  app.use("/", routes);

  app.use(errorHandler);
  return app;
};
