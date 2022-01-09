const express = require("express");
const {
  register,
  login,
  sub,
  attend,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.post("/sub", sub);
router.get("/attend", attend);

module.exports = router;
