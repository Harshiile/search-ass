import { Response, Request } from "express";
import csv from "csvtojson";
import axios from "axios";
import { CustomError } from "../../types/error";

// If same id occurs, it overwrites
export const createIndexAndFeed = async (req: Request, res: Response) => {
  const { indexName } = req.query;

  const csvData = await csv().fromFile(req.file?.path!);

  if (!indexName) throw new CustomError(404, "Index Name Not Given");

  if (!process.env.MEILISEARCH_URL)
    throw new CustomError(404, "Unvalid DB Authentication");

  const { data } = await axios
    .post(
      `${process.env.MEILISEARCH_URL!}/indexes/${indexName}/documents`,
      csvData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((err) => {
      throw new CustomError(404, "Failed to feed data");
    });

  // Insert on DB

  res.status(200).json({
    message: "Data Feeded Sucessfully",
  });
};
