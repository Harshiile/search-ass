import { Response, Request } from "express";
import { sign } from "jsonwebtoken";
import { CustomError } from "../../types/error";

export const generationApiKey = async (req: Request, res: Response) => {
  const userId = "cb9a5068-838f-4c81-860d-36ad704a0b95";
  const apiKey = sign(userId, process.env.JWT_SECRET!);
  res.json(apiKey);
};
