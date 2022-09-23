require("express-async-errors");
const error = require("./middleware/error");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const rentals = require("./routes/rental");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const func = require("joi/lib/types/func");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected..."))
  .catch((err) => console.error(`couldn't connect to database`, err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}...`));

exports.mongoose = mongoose;
