import { Response, Request } from "express";
import axios from "axios";
import { CustomError } from "../../types/error";

export const deleteIndex = async (req: Request, res: Response) => {
  const { indexName } = req.query;

  if (!indexName) throw new CustomError(404, "Index Name Not Given");

  if (!process.env.MEILISEARCH_URL)
    throw new CustomError(404, "Unvalid DB Authentication");

  const { data } = await axios
    .delete(`${process.env.MEILISEARCH_URL!}/indexes/${indexName}`)
    .catch((err) => {
      throw new CustomError(400, "Failed to search item");
    });

  // Delete on DB

  res.status(200).json({ message: "Index Deleted" });
};
