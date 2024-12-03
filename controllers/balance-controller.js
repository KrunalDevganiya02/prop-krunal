const { User, Expense, Balance } = require("../model/associateAllModel");

const viewBalance = async (req, res) => {
  try {
    const { id } = req.params;

    const balance = await Balance.findOne({ where: { id } });

    if (!balance) {
      return res.status(404).json({ error: "No balance found for this user" });
    }

    return res.status(200).json({
      balance: balance,
      //   balance: balance.balance_amount,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to fetch balance" });
  }
};

module.exports = { viewBalance };
