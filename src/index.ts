import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routers";
import { CustomError } from "./types/error";

const app = express();
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
dotenv.config();
const PORT = process.env.PORT;

app.use("/", router);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    error: err.message,
  });
});
app.listen(PORT, (_) => console.log(`Sever Running On ${PORT}`));
