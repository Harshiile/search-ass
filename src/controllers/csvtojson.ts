import { Response, Request } from "express";
import csv from "csvtojson";

export const convertToJSON = async (req: Request, res: Response) => {
  const data = await csv().fromFile(req.file?.path!);
  res.status(200).json(data);
};
