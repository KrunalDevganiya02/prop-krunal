const express = require("express");
const router = express.Router();
const {
  register,
  loginUser,
  setDefaultCurrency,
  viewProfile,
  updateEmail,
  updateDefaultCurrency,
  deleteAccount,
} = require("../controllers/user-controller");

router.post("/register", register);
router.post("/login", loginUser);
router.post("/set-default-currency/:id", setDefaultCurrency);
router.get("/view-profile/:id", viewProfile);
router.post("/update-email/:id", updateEmail);
router.post("/update-default-currency/:id", updateDefaultCurrency);
router.post("/delete-account/:id", deleteAccount);

module.exports = router;
