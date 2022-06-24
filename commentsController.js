const model = require("../model/commentsModel");

//GET COMMENTS CONTROLLER
const getComments = async (req, res) => {
  try {
    const getData = await model.getComments();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

// POST COMMENTS CONTROLLER
const addComments = async (req, res) => {
  try {
    const { id, recipe, comment } = req.body;
    const addComments = await model.addComments({ id, recipe, comment });

    if (addComments) {
      res.send("data berhasil di tambah");
    } else {
      res.status(400).send("data gagal di tambah");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getComments,
  addComments,
};
