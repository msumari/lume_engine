const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../tokenVerify");

//CREATE
/* If the user is an admin, then create a new movie and save it to the database. */

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    /* 1. We try to save the new movie to the database.
  2. If the save is successful, we return the movie with a status code of 201.
  3. If the save fails, we return the error with a status code of 500. */

    try {
      const saveMovie = await newMovie.save();
      res.status(201).json(saveMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//UPDATE
/* If the user is an admin, update the movie with the given id. */
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    /* Find the movie with the given id, update it with the given data, and return the updated movie. */
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//DELETE
/* The router.delete method is used to delete a movie. 
The verify middleware is used to verify that the user is an admin. 
The async await is used to delete the movie. 
If the movie is deleted, we return a status code of 200. 
If the movie is not deleted, we return a status code of 500. */

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//GET
/* Find a movie by its ID. */
router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM
/* Get a random movie from the database. */
router.get("/random", async (req, res) => {
  const type = req.query.type;
  let movie;

  /* This code is a JavaScript function that will find a random movie from the database that is a
  series. */
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } /* Get a random movie from the database that is not a series. */ else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
/* If the user is an admin, then return all movies. */
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    /* Get all movies from the database and return them in reverse order. */
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

// SEARCH
/* 1. We're using the `` aggregation operator to search the `movie` index for the `term` that
was passed in the request.

 */
router.get("/search", async (req, res) => {
  const term = req.query.term;
  const limit = 10;
  const page = parseInt(req.query.page);
  const skip = parseInt((page - 1) * limit);

  /* The code above is a search query that searches the movie index for the term that is passed in. 
It then skips the first skip number of results and returns the first limit number of results. */
  try {
    let cursor = await Movie.aggregate([
      {
        $search: {
          index: "movie",
          text: {
            query: `${term}`,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ])
      .skip(skip)
      .limit(limit);

    res.status(200).json(cursor);
  } catch (err) {
    res.status(500).json("search failed");
  }
});

module.exports = router;
