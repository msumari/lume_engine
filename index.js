const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");

const movieRoute = require("./routes/movie");

const userRoute = require("./routes/user");
const getMoviesRoute = require("./routes/movie");
const moviesListRoute = require("./routes/list");
const migrateRoute = require("./routes/migrate");
dotenv.config();

/* Connect to the MongoDB database using the Mongoose library. */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

/* The app.use() method is used to register middleware functions. 
The first argument is the path of the middleware. 
The second argument is the middleware function. 
The middleware function is executed when the path is matched. */
app.use(cors({ origin: "*" }));
app.use(compression());

app.use(express.json());

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/movies", getMoviesRoute);
app.use("/api/lists", moviesListRoute);
app.use("/api/migrate", migrateRoute);

app.use("/api/auth", authRoute);

/* This is the code that is running our backend. It is listening on port 8800 and when a request is
made to that port, it will run the code in the callback function. */
app.listen(process.env.PORT || 8800, () => {
  console.log("backend is up");
});
