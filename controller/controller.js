import Joi from "joi";
import { movies } from "../Movies/movies.js";

const inputValidationHandler = (movie) => {
  const schema = Joi.object({
    id: Joi.number().max(30).required(),
    title: Joi.string().min(5).max(30).required(),
    type: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(10).max(50).required(),
  })
    .with("id", "title")
    .with("type", "description");

  return schema.validate(movie);
};

/***
 * @route   GET /api/genres
 * @desc    Get all genres
 * @access  Private
 *  ***/
export const getAllGenres = (req, res) => {
  try {
    res.status(200).send(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   GET /api/genres/:id
 * @desc    Get a specific genres
 * @access  Private
 *  ***/
export const getSingleGenres = (req, res) => {
  const { id } = req.params;
  try {
    const neededMovie = movies.find((movie) => {
      return movie.id === parseInt(id);
    });

    if (!neededMovie) {
      return res.status(404).send("There is no movie with the given id");
    }

    res.status(200).send(neededMovie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   GET /api/genres
 * @desc    Create new Genres
 * @access  Public
 *  ***/
export const postGenres = (req, res) => {
  const movie = req.body;

  try {
    const { error, value } = inputValidationHandler(movie);
    if (error) {
      console.log(`Error msg: ${error}`);
      return res.status(400).send(error.message);
    }

    movies.push(value);
    console.log("Post successful: ", value);
    res.status(200).send(value);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   GET /api/genres/:id
 * @desc    Update genres
 * @access  Public
 *  ***/
export const updateGenres = (req, res) => {
  const { id, title, type, description } = req.body;

  const updatedGenres = {};
  if (id) updatedGenres.id = id;
  if (title) updatedGenres.title = title;
  if (type) updatedGenres.type = type;
  if (description) updatedGenres.description = description;

  try {
    let neededMovie = movies.find((movie) => {
      return movie.id === parseInt(req.params.id);
    });

    if (!neededMovie) {
      return res.status(404).send("There is no movie with the given id");
    }

    const { error } = inputValidationHandler(req.body);

    if (error) {
      console.log(`Error msg: ${error}`);
      return res.status(400).send(error.message);
    }
    const idx = movies.indexOf(neededMovie);
    if (idx !== -1) {
      movies[idx] = updatedGenres;
    }

    res.status(200).send(updatedGenres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

/***
 * @route   GET /api/genres
 * @desc    Delete genres
 * @access  Public
 *  ***/
export const deleteGenres = (req, res) => {
  const { id } = req.params;

  try {
    let neededMovie = movies.find((movie) => {
      return movie.id === parseInt(id);
    });

    if (!neededMovie) {
      return res.status(404).send("There is no movie with the given id");
    }

    const idx = movies.indexOf(neededMovie);
    movies.splice(idx, 1);
    res.status(200).send("Genres deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};
