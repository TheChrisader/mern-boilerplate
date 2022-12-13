const express = require("express");
const { login, register } = require("../controllers/Auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
