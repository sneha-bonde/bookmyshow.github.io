import express from "express";
import { addMovie, getAllMovies } from "../controllers/movie-controller";
const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getAllMovies);
movieRouter.post("/", addMovie);

 export default movieRouter;