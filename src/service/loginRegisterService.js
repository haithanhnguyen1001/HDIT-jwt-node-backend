//DIR src/service/loginRegisterService/js

import db from "../models/index";
import { Op } from "sequelize";
import bcrypt, { hash } from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};
const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phone are existed ?
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone number is already exist",
        EC: 1,
      };
    }
    // hash user password
    let hashPassword = hashUserPassword(rawUserData.password);
    //create
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPassword,
      phone: rawUserData.phone,
    });
    return {
      EM: "A user is created successfully!",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
    };
  }
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); //true or false
};

const handleUserLogin = async (rawData) => {
  try {
    //check email/phone are existed ?
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          {
            email: rawData.valueLogin,
          },
          { phone: rawData.valueLogin },
        ],
      },
      raw: true,
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        return {
          EM: "OK",
          EC: 0,
          DT: "",
        };
      }
    }
    console.log(
      ">>> Not found user with email/password",
      rawData.valueLogin,
      rawData.password
    );
    return {
      EM: "Your email/phone number or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
};
