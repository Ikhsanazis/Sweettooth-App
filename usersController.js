const model = require("../model/usersModel");

//GET USERS
const getUsers = async (req, res) => {
  try {
    const getData = await model.getUsers();

    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

// POST USERS CONTROLLER
const addUser = async (req, res) => {
  try {
    const { id, username, email, password } = req.body;
    const addUser = await model.addUser({ id, username, email, password });

    if (addUser) {
      res.send("data berhasil di tambah");
    } else {
      res.status(400).send("data gagal di tambah");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

// PATCH USERS CONTROLLER
const editUser = async (req, res) => {
  try {
    const { id, username, email, password } = req.body;

    const getData = await model.getUserById(id);

    if (getData.rowCount > 0) {
      let newUserName = username || getData?.rows[0]?.username;
      let newPassword = password || getData?.rows[0]?.password;
      let newEmail = email || getData?.rows[0]?.email;

      let message = "";

      if (newUserName) message += "username,";
      if (newPassword) message += "password,";
      if (newEmail) message += "email,";

      const editData = await model.editUser({
        name: newUserName,
        email: newEmail,
        password: newPassword,
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
// DELETE USERS CONTROLLER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Check user by id
    const getData = await model.getUserById(id);

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteUser(id);

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
  getUsers,
  addUser,
  editUser,
  deleteUser,
};
