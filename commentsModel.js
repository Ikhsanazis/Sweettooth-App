const db = require("../db");

//GET COMMENTS MODEL
const getComments = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM comments `, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// POST COMMENTS MODEL
const addComments = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO comments (id, recipe, comment) VALUES ($1, $2, $3) RETURNING *`,
      [props.id, props.RECIPE, props.comment],
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

module.exports = {
  getComments,
  addComments,
};
