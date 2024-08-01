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

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
};
