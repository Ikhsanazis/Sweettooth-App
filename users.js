const Router= require("express").Router();
const db = require("../db");
const controller = require("../Controller/usersController");

// GET USERS
Router.get("/users",controller.getUsers);

// POST USERS
Router.post("/users/add", controller.addUser);

// PATCH USERS
Router.patch("/users/edit", controller.editUser);

// DELETE USERS ROUTES
Router.delete("/users/delete", controller.deleteUser);

module.exports = Router;