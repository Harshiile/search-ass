import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import { CustomError } from "../types/error";

const redis = new Redis();

const DAY_IN_SECONDS = 24 * 60 * 60;
export const rateLimiter = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.userId) throw new CustomError(403, "Unauthorized User");

  const encounter = await redis.incr(req.userId);
  if (encounter == 1) {
    await redis.expire(req.userId, DAY_IN_SECONDS);
  }
  console.log("Encounter : ", encounter);

  if (encounter > Number(process.env.RATE_LIMIT!)) {
    throw new CustomError(429, "Limit Reached, Try Again Later");
  }
  next();
};
