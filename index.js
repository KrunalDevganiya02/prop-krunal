const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const sequelize = require("./model/db");
require("./model/associateAllModel");

app.use(bodyParser.json());

//for createuser,add expense,view balance
const api = require("./routes/create_user_expense_viewBalance");
app.use("/api", api);

//for register and login
const auth = require("./routes/user-route");
app.use("/user", auth);

//for expense
const expense = require("./routes/expense-route");
app.use("/expence", expense);

//for balance
const balance = require("./routes/balance-route");
app.use("/balance", balance);

app.listen(port, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    console.error("Error syncing with database:", err);
  }
});
