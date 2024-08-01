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
  return res.send("Created a new user!");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
