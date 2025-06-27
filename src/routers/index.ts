import { Router } from "express";
import multer from "multer";
import {
  createIndexAndFeed,
  deleteIndex,
  searchDocumentIndex,
} from "../controllers/index";
import { generationApiKey } from "../controllers/api-keys";
import { apiKeyAuthorizeMiddleware } from "../middlewate/api-key-authorize";
import { rateLimiter } from "../middlewate/rate-limiter";
export const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/api-key", generationApiKey);

router.post(
  "/indexes/feed",
  apiKeyAuthorizeMiddleware,
  upload.single("csv-file"),
  createIndexAndFeed
);
router.post(
  "/indexes/search",
  apiKeyAuthorizeMiddleware,
  rateLimiter,
  searchDocumentIndex
);
router.delete("/indexes/delete", apiKeyAuthorizeMiddleware, deleteIndex);
