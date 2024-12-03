const { User, Expense, Balance } = require("../model/associateAllModel");

// const createNewUSer = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await User.create({ name, email, password });
//     return res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ error: "Failed to create user" });
//   }
// };

const newExpense = async (req, res) => {
  try {
    const { user_id, description, amount, expense_date } = req.body;

    // Check if the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the expense
    const expense = await Expense.create({
      user_id,
      description,
      amount,
      expense_date,
    });

    // Update the user's balance
    const balance = await Balance.findOne({ where: { user_id } });

    if (balance) {
      // Deduct the expense amount from the balance
      balance.balance -= parseFloat(amount);
      await balance.save();
    } else {
      // Create a balance entry if none exists
      await Balance.create({
        user_id,
        balance: -parseFloat(amount),
      });
    }

    return res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to add expense" });
  }
};

const viewBalance = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the user's balance directly
    const balance = await Balance.findOne({ where: { user_id: id } });

    if (!balance) {
      return res.status(404).json({ error: "Balance not found for this user" });
    }

    return res.status(200).json({ balance: balance.balance });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to fetch balance" });
  }
};

module.exports = { newExpense, viewBalance };
