const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const login = require("../controller/login");

router.post("/login", login.LoginAdmin);
router.get("/logout", auth, login.LogoutAdmin);
router.post("/admin/update-password", auth, login.UpdateAdminPassword);
router.post("/admin/send-forgot-password-mail", login.sendForgotMail);

module.exports = router;
