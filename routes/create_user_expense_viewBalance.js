const express = require("express");
const {
  // createNewUSer,
  newExpense,
  viewBalance,
} = require("../controllers/create_user");
const router = express.Router();

// router.post("/create-user", createNewUSer);
router.post("/new-expense", newExpense);
router.get("/view-balance/:id", viewBalance);

module.exports = router;
