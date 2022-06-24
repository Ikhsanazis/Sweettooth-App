const model = require("../model/recipesModel");
const multer = require("multer");

//GET RECIPES CONTROLLER
const getRecipes = async (req, res) => {
  try {
    const getData = await model.getAllRecipes();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

//FIND RECIPES
const findRecipes = async (req, res) => {
  try {
    const getData = await model.findRecipes();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};
//FIND NEW RECIPES
const newRecipes = async (req, res) => {
  try {
    const getData = await model.newRecipes();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

// POST RECIPES

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

// PATCH RECIPES CONTROLLER
const editRecipes = async (req, res) => {
  try {
    const { id, name, ingredients } = req.body;

    // Check user by id
    const getData = await model.getUserById(id);

    if (getData.rowCount > 0) {
      let newName = name || result?.rows[0]?.name;
      let newIngredients = ingredients || result?.rows[0]?.ingredients;

      let message = "";
      if (newName) message += "Name,";
      if (newIngredients) message += "Ingredients,";

      const editData = await model.editRecipes({
        name: newName,
        ingredients: newIngredients,
        id,
      });

      if (editData) {
        res.send(`${message} berhasil di ubah`);
      } else {
        res.status(400).send("data gagal di ubah");
      }
    } else {
      res.status(400).send("data tidak di temukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const addRecipes = async (req, res) => {
  try {
    const { id, name, ingredients } = req.body;
    const addRecipes = await model.addRecipes({ id, name, ingredients, image });

    if (addRecipes) {
      res.send("data berhasil di tambah");
    } else {
      res.status(400).send("data gagal di tambah");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

// DELETE RECIPES CONTROLLER
const deleteRecipes = async (req, res) => {
  try {
    const { id } = req.body;

    // Check recipes by id
    const getData = await model.getRecipesById(id);

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteRecipes(id);

      if (deleteUser) {
        res.send(`data id ke ${id} berhasil di hapus`);
      } else {
        res.status(400).send("data gagal di hapus");
      }
    } else {
      res.status(400).send("data tidak di temukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getRecipes,
  findRecipes,
  newRecipes,
  upload,
  addRecipes,
  editRecipes,
  deleteRecipes,
};
