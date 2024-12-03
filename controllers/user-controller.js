const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Expense, Balance } = require("../model/associateAllModel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to register user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "MY_NAME_IS_KRUNAL_DEVGANIYA",
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to log in" });
  }
};

const setDefaultCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const { default_currency } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.default_currency = default_currency;
    await user.save();

    return res
      .status(200)
      .json({ message: "Default currency updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to update default currency" });
  }
};

const viewProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User profile fetched successfully", user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to fetch user profile" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "email not found" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.email = email;
    await user.save();

    return res
      .status(200)
      .json({ message: "Email updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update email" });
  }
};

const updateDefaultCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const { default_currency } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.default_currency = default_currency;
    await user.save();

    res
      .status(200)
      .json({ message: "Default currency updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update default currency" });
  }
};
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to delete account" });
  }
};

module.exports = {
  register,
  loginUser,
  setDefaultCurrency,
  viewProfile,
  updateEmail,
  updateDefaultCurrency,
  deleteAccount,
};
