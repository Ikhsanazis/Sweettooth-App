const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require("./db");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

const usersRoutes = require("./Route/users");
const recipesRoutes = require("./Route/recipes");
const commentsRoutes = require("./Route/comments");

app.use(helmet());
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define all routes
app.use("/", usersRoutes);
app.use("/", recipesRoutes);
app.use("/", commentsRoutes);

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
