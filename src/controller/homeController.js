const handleHelloWorld = (req, res) => {
  res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  res.render("user.ejs");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
};
