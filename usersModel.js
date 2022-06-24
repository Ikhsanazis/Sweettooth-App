const db = require("../db");

//GET USERS
const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users `, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//DELETE USERS MODEL
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// POST USERS MODEL
const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [props.id, props.username, props.email, props.password],
      (error, result) => {
        if (props.password.length < 8) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// PATCH USERS MODEL
const editUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4`,
      [props.username, props.email, props.password, props.id],
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

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
};
