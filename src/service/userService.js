import mysql from "mysql2/promise";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

// Create the connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "jwt",
  port: 3307,
  // password: '',
});

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const createNewUser = async (email, password, username) => {
  const userHashPassword = hashUserPassword(password);
  try {
    await db.User.create({
      email: email,
      username: username,
      password: userHashPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

const getListUser = async () => {
  try {
    let users = [];
    users = await db.User.findAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    let user = {};
    user = await db.User.findOne({
      where: { id: id },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async (id, email, username) => {
  try {
    await db.User.update(
      { email: email, username, username },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  getListUser,
  deleteUser,
  getUserById,
  updateUserInfo,
};
