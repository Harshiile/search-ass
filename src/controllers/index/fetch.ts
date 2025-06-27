import { Response, Request } from "express";
import axios from "axios";
import { CustomError } from "../../types/error";

export const searchDocumentIndex = async (req: Request, res: Response) => {
  const { indexName, params } = req.query;

  if (!indexName && !params) throw new CustomError(404, "Unvalid Params");

  if (!process.env.MEILISEARCH_URL)
    throw new CustomError(404, "Unvalid DB Authentication");

  const queryBody = {
    q: params,
  };

  const { data } = await axios
    .post(
      `${process.env.MEILISEARCH_URL!}/indexes/${indexName}/search`,
      queryBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((err) => {
      throw new CustomError(400, "Failed to search item");
    });

  res.status(200).json({
    data: data?.hits || [],
  });
};
