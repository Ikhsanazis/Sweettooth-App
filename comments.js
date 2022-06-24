const Router= require("express").Router();
const db = require("../db");
const controller = require("../Controller/commentsController");

//GET RECIPES ROUTES
Router.get("/comments",controller.getComments);

// POST COMMENTS
Router.post("/comments/add", controller.addComments);

module.exports = Router;