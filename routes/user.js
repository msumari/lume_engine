const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../tokenVerify");

//UPDATE
/* If the user is updating their own account, or if the user is an admin, then update the user. */
router.put("/:id", verify, async (req, res) => {
  /* If the user is the same as the user being edited, or the user is an admin, then the password is
  encrypted. */
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    /* Find the user with the given id, update the user with the given data, and return the updated
    user. */
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json("user failed to update");
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

//DELETE
/* If the user is an admin,
then they can delete any user. If the user is not an admin, then they can
only delete themselves. */
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    /* We try to find the user by their id and delete them. If we can't find the user, we send a 404
   error. 
   If we can find the user, we check to see if the user is the same as the logged in user. If they
   are, we delete the user. 
   If they aren't, we send a 403 error. */
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (err) {
      res.status(500).json("user failed to delete");
    }
  } else {
    res.status(403).json("You can delete only your account");
  }
});

//GET
/* Find a user by their id and return their information. */
router.get("/find/:id", async (req, res) => {
  try {
    /* Find a user by their ID, and return the user's information. */
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json("user failed to retrieve");
  }
});

//GET ALL
/* If the user is an admin, then we will query the database for all users. If the user is not an admin,
then we will return a 403 error. */
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(10)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("failed to get users");
    }
  } else {
    res.status(403).json("You do not have admin authorization ");
  }
});

//GET STATS
/* Aggregate the users collection to find the total number of users created each month. */
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.send(500).json(err);
  }
});

module.exports = router;
