import { Response, Request, NextFunction } from "express";
import { jwtValidate } from "../utils/jwt";
import { CustomError } from "../types/error";

export const apiKeyAuthorizeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) throw new CustomError(404, "API Keys not found");

  try {
    const userId = jwtValidate<string>(authorizationHeader);
    req.userId = userId;
    next();
  } catch (error) {
    throw new CustomError(400, "Authorization Failed");
  }
};
