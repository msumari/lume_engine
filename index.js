const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const whitelist = ["http://lume.msumari.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

const authRoute = require("./routes/auth");

const movieRoute = require("./routes/movie");

const userRoute = require("./routes/user");
const getMoviesRoute = require("./routes/movie");
const moviesListRoute = require("./routes/list");
const migrateRoute = require("./routes/migrate");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

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

app.listen(process.env.PORT || 8800, () => {
  console.log("backend is up");
});
