import mysql from "mysql2/promise";
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
    const connection = await pool.getConnection();
    const [result, fields] = await connection.query(
      `INSERT INTO users (email,password,username) VALUES (?,?,?)`,
      [email, userHashPassword, username]
    );
    connection.release();
  } catch (error) {
    console.log(error);
  }
};

const getListUser = async () => {
  let users = [];
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query("SELECT * from users");
    users = rows;
    connection.release();
  } catch (error) {
    console.log(error);
  }

  return users;
};

module.exports = {
  createNewUser,
  getListUser,
};
