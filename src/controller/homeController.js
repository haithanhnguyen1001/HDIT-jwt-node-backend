// Get the client
import mysql from "mysql2";

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  database: "jwt",
});

const handleHelloWorld = (req, res) => {
  res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  const { email, password, username } = req.body;
  connection.query(
    `INSERT INTO users (email,password,username) VALUES (?,?,?)`,
    [email, password, username],
    (err, results, fields) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.send("Created a new user!");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
