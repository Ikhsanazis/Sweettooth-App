const db = require("../db");

//GET RECIPES MODEL
const getRecipes = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes `, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//FIND RECIPES
const findRecipes = () => {
  return new Promise((resolve, reject) => {
    const { name } = req.body;
    db.query(
      `SELECT * FROM recipes WHERE name = $1`,
      [name],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

//FIND NEW RECIPES
const newRecipes = () => {
  return new Promise((resolve, reject) => {
    const { id } = req.body;
    db.query(
      `SELECT * FROM recipes ORDER BY id  DESC LIMIT 5 `,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// POST RECIPES MODEL
const addRecipes = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipes (id, name, ingredients,image) VALUES ($1, $2, $3, $4) RETURNING *`,
      [props.id, props.name, props.ingredients, props.image],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// PATCH RECIPES MODEL
const editRecipes = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipes SET name= $1,ingredients = $2 WHERE name = $3`,
      [props.name, props.ingredients, props.id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

//DELETE RECIPES MODEL
const getRecipesById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteRecipes = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getRecipes,
  findRecipes,
  newRecipes,
  addRecipes,
  editRecipes,
  getRecipesById,
  deleteRecipes,
};
