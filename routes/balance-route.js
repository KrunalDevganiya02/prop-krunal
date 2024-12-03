const express = require("express");
const { viewBalance } = require("../controllers/balance-controller");
const router = express.Router();

router.get("/check-balance/:id", viewBalance);

module.exports = router;
