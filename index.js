const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require("./db");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();


app.use(helmet());
const cors= require("cors")
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



let profile = [];
//ALL ABOUT GET

// GET USERS
app.get("/users", (req, res) => {
  db.query(`SELECT * FROM users `, (error, result) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send({ data: result.rows });
    }
  });
});

// GET RECIPES
app.get("/recipes", (req, res) => {
  db.query(`SELECT * FROM recipes `, (error, result) => {
    if (error) {
      res.status(400).send("There's an error");
    } else {
      res.send({ data: result.rows, jumlahData: result.rowCount });
    }
  });
});

//GET COMMENTS
app.get("/comments", (req, res) => {
  db.query(`SELECT * FROM comments `, (error, result) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send({ data: result.rows });
    }
  });
});

// FIND RECIPE

app.get("/recipes/find", (req, res) => {
  const { name } = req.body;
  db.query(`SELECT * FROM recipes WHERE name = $1`, [name], (error, result) => {
    if (error) {
      res.status(400).send("There's an error");
    } else {
      res.send({ data: result.rows, jumlahData: result.rowCount });
    }
  });
});

app.get("/recipes/newrecipe", (req, res) => {
  const { id } = req.body;
  db.query(
    `SELECT * FROM recipes ORDER BY id  DESC LIMIT 5 `,
    (error, result) => {
      if (error) {
        res.status(400).send("There's an error");
      } else {
        res.send({ data: result.rows });
      }
    }
  );
});

//ALL ABOUT POST

// POST USERS
app.post("/users/add", (req, res) => {
  const { id, username, email, password } = req.body;
  db.query(
    `INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    [id, username, email, password],
    (error, result) => {
      if (password.length < 8) {
        res.status(400).send("Password must have 8 character");
      } else {
        if (error) {
          console.log("error", error);
          res.status(400).send("There's an error");
        } else {
          res.send("data added successfully");
        }
      }
    }
  );
});

//POST RECIPES
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

app.post("/recipes/add", upload.single("image"), (req, res) => {
  const { id, name, ingredients } = req.body;
  db.query(
    `INSERT INTO recipes (id, name, ingredients,image) VALUES ($1, $2, $3, $4) RETURNING *`,
    [id, name, ingredients, req?.file?.path],
    (error, result) => {
      if (error) {
        console.log("error", error);
        console.log(error);
        res.status(400).send("There's an error");
      } else {
        res.send("data added");
        console.log(req.file);
      }
    }
  );
});

// POST COMMENTS
app.post("/comments/add", (req, res) => {
  const { id, recipe, comment } = req.body;
  db.query(
    `INSERT INTO comments (id, recipe, comment) VALUES ($1, $2, $3) RETURNING *`,
    [id, recipe, comment],
    (error, result) => {
      if (error) {
        console.log("error", error);
        res.status(400).send("There's an error");
      } else {
        res.send("Thanks for your comment!");
      }
    }
  );
});

//ALL ABOUT PATCH
// EDIT PROFILE
app.patch("/users/edit", (req, res) => {
  const { id, username, email, password } = req.body;
  db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
    if (error) {
      res.status(400).send("There's an error");
    } else {
      if (result.rowCount > 0) {
        let newUserName = username || result?.rows[0]?.username;
        let newPassword = password || result?.rows[0]?.password;
        let newEmail = email || result?.rows[0]?.email;

        let message = "";
        if (newUserName) message += "username,";
        if (newPassword) message += "password,";
        if (newEmail) message += "email,";

        db.query(
          `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4`,
          [newUserName, newEmail, newPassword, id],
          (error, result) => {
            if (error) {
              console.log("error", error);
              res.status(400).send("There's an error");
            } else {
              res.send(`${message} updated`);
            }
          }
        );
      } else {
        res.status(400).send("data not found");
        console.log(result.rowCount);
      }
    }
  });
});

//EDIT RECIPE
app.patch("/recipes/edit", (req, res) => {
  const { id, name, ingredients } = req.body;
  db.query(`SELECT * FROM recipes WHERE id = $1`, [id], (error, result) => {
    if (error) {
      res.status(400).send("There's an error");
    } else {
      if (result.rowCount > 0) {
        let newName = name || result?.rows[0]?.name;
        let newIngredients = ingredients || result?.rows[0]?.ingredients;

        let message = "";
        if (newName) message += "Name,";
        if (newIngredients) message += "Ingredients,";

        db.query(
          `UPDATE recipes SET name= $1,ingredients = $2 WHERE name = $3`,
          [newName, newIngredients, id],
          (error, result) => {
            if (error) {
              console.log("error", error);
              res.status(400).send("There's an error");
            } else {
              res.send(`${message} updated`);
            }
          }
        );
      } else {
        res.status(400).send("data not found");
      }
    }
  });
});

//ALL ABOUT DELETE

// DELETE PROFILE
app.delete("/users/delete", (req, res) => {
  const { id } = req.body;
  db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
    if (error) {
      res.status(400).send("There's an error");
    } else {
      if (result.rowCount > 0) {
        db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
          if (error) {
            res.status(400).send("There's an error");
          } else {
            res.send("data deleted");
          }
        });
      } else {
        res.status(400).send("data not found");
      }
    }
  });
});

//DELETE RECIPES
app.delete("/recipes/delete", (req, res) => {
  const { id } = req.body;
  db.query(`SELECT * FROM recipes WHERE id = $1`, [id], (error, result) => {
    if (error) {
      res.status(400).send("There's an error");
    } else {
      if (result.rowCount > 0) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], (error, result) => {
          if (error) {
            res.status(400).send("There's an error");
          } else {
            res.send("data deleted");
          }
        });
      } else {
        res.status(400).send("data not found");
      }
    }
  });
});

// end of bottom code
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
