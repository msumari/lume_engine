const router = require("express").Router();
const { default: axios } = require("axios");
const Movie = require("../models/Movie");
const getData = require("../source");
// const verify = require("../tokenVerify");

//Migrate
router.get("/", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  let data = getData(page, limit);
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  //   if (req.user.isAdmin) {
  //     const newMovie = new Movie(req.body);
  //     try {
  //       const saveMovie = await newMovie.save();
  //       res.status(201).json(saveMovie);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   } else {
  //     res.status(403).json("You are not allowed");
  //   }
});

module.exports = router;
