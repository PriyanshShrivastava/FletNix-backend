const JWT = require("jsonwebtoken");
const userModel = require("../model/userModel.js");
const { comparePassword, hashPassword } = require("../helpers/authHelper.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!email) {
      return res.send({ message: "Please enter an email" });
    }
    if (!password) {
      return res.send({ message: "Please enter a valid Password" });
    }
    if (!age) {
      return res.send({ message: "Please enter your age" });
    }
    if (!name) {
      return res.send({ message: "Please enter your name" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: `${email} Already registered, Please Log in`,
      });
    }

    // Register User
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      age,
    }).save();

    res.status(200).send({
      success: true,
      message: "User saved successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: `Error aa gya bhai`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Value validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ sucess: false, message: "Invalid email or password" });
    }
    // check user
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ sucess: false, message: "User not found" });
    }

    // Compare password
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res
        .status(403)
        .send({ sucess: false, message: "Incorrect password" });
    }
    // Token creation
    const token = await JWT?.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    res.status(200).send({
      success: true,
      message: "Succesfully Logged in",
      user: {
        _id: user._id,
        email: user.email,
        age: user.age,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `${error.message}`,
    });
  }
};

module.exports = { registerUser: registerUser, loginUser: loginUser };
