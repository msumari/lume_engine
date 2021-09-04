const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");

const movieRoute = require("./routes/movie");

const userRoute = require("./routes/user");
const getMoviesRoute = require("./routes/movie");
const moviesListRoute = require("./routes/list");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/movies", getMoviesRoute);
app.use("/api/lists", moviesListRoute);

app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("backend is up");
});
