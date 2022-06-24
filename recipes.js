const Router= require("express").Router();
const db = require("../db");
const controller = require("../Controller/recipesController");

//GET RECIPES ROUTES
Router.get("/recipes",controller.getRecipes);

// FIND RECIPES
Router.get("/recipes/find", controller.findRecipes);

// FIND NEW RECIPES
Router.get("/recipes/newrecipe", controller.newRecipes);

// POST RECIPES
Router.post("/recipes/add", controller.upload.single("image"), controller.addRecipes);

// PATCH RECIPES
Router.patch("/recipes/edit", controller.editRecipes);


// DELETE RECIPES ROUTES
Router.delete("/recipes/delete", controller.deleteRecipes);

module.exports = Router;
