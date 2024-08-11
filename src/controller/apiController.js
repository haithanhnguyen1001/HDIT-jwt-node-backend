//DIR: src/controller/apiController.js

import loginRegisterService from "../service/loginRegisterService";

const handleRegister = async (req, res) => {
  try {
    const { email, phone, username, password } = req.body;
    if (!email || !phone || !password) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    if (password && password.length < 3) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters",
        EC: "1",
        DT: "",
      });
    }
    //service: create username
    let data = await loginRegisterService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
