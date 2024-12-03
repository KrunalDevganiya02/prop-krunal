const { User, Expense, Balance } = require("../model/associateAllModel");

const addExpense = async (req, res) => {
  try {
    const { user_id, name, value, currency, members, date } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!name || !value || !currency || !members || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const expense = await Expense.create({
      user_id,
      name,
      value,
      currency,
      members,
      date,
    });

    return res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to add expense" });
  }
};

const viewExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to fetch expense" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, value, currency, members, date } = req.body;

    if (!name || !value || !currency || !members || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    expense.name = name;
    expense.value = value;
    expense.currency = currency;
    expense.members = members;
    expense.date = date;

    await expense.save();

    return res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await expense.destroy();

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to delete expense" });
  }
};

module.exports = { addExpense, viewExpense, updateExpense, deleteExpense };
