const User = require("./user-model");
const Expense = require("./exprense-model");
const Balance = require("./balance-model");

User.hasMany(Expense, { foreignKey: "user_id", onDelete: "CASCADE" });
Expense.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Balance, { foreignKey: "user_id", onDelete: "CASCADE" });
Balance.belongsTo(User, { foreignKey: "user_id" });

module.exports = { User, Expense, Balance };
