const router = require("express").Router();
const List = require("../models/List");
const verify = require("../tokenVerify");

//CREATE
/* If the user is an admin, create a new list and save it to the database. */

router.post("/create", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);

    try {
      const saveList = await newList.save();
      res.status(201).json(saveList);
    } catch (err) {
      res.status(500).json("Movie not created");
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//DELETE
/* If the user is an admin, delete the list by it`s ID. */

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);

    /* We try to delete the list with the given id. 
    If the list is found, we delete it. 
    If the list is not found, we send a 404 error. 
    If an error occurs, we send a 500 error. */

    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//GET
/* Get a random list of 10 items from the database. */
router.get("/", async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;

  let list = [];

  /* If the user has provided a type and genre, then find all lists that match both the type and genre.
  If the user has provided a type, then find all lists that match the type. If the user has not
  provided a type or genre, then find a random list. */
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $match: { $and: [{ type: typeQuery }, { genre: genreQuery }] } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
