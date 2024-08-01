import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getListUser();
  console.log(userList);
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = async (req, res) => {
  const { email, password, username } = req.body;
  await userService.createNewUser(email, password, username);
  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  const userId = req.params.id;
  const result = await userService.deleteUser(userId);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  const userId = req.params.id;
  const user = await userService.getUserById(userId);
  let userData = {};
  if (user && user.length > 0) {
    userData = user[0];
  }
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  const { email, username, id } = req.body;
  await userService.updateUserInfo(id, email, username);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
