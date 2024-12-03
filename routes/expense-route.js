const express = require("express");
const router = express.Router();

const {
  addExpense,
  viewExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense-controller");

router.post("/add-expense", addExpense);
router.get("/view-expense/:id", viewExpense);
router.post("/update-expense", updateExpense);
router.post("/delete-expense", deleteExpense);

module.exports = router;
