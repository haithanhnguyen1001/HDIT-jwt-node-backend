const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = (req, res) => {
  console.log("call me");
};

module.exports = {
  testApi,
  handleRegister,
};
