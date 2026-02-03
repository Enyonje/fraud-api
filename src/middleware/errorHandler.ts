import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error({ err }, "unhandled_error");
  res.status(500).json({ error: "Internal Server Error" });
}
