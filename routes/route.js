import express from "express";
import {
  getAllGenres,
  getSingleGenres,
  postGenres,
  updateGenres,
  deleteGenres,
} from "../controller/controller.js";

const router = express.Router();

router.get("/", getAllGenres);
router.post("/", postGenres);
router.get("/:id", getSingleGenres);
router.patch("/:id", updateGenres);
router.delete("/:id", deleteGenres);

export default router;
