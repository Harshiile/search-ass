import { Router } from "express";
import multer from "multer";
import { convertToJSON } from "../controllers/csvtojson";
import { createIndexAndFeed } from "../controllers/index/feed";
import { searchDocumentIndex } from "../controllers/index/fetch";
import { deleteIndex } from "../controllers/index/delete";

export const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/index/feed", upload.single("csv-file"), createIndexAndFeed);
router.post("/index/search", searchDocumentIndex);
router.delete("/index/delete", deleteIndex);
router.post("/convert", upload.single("csv-file"), convertToJSON);
