const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")
const userAuth = require("../middlewares/auth.middleware");


router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/me", userAuth, userController.me);
router.post("/logout", userController.logout);


module.exports = router;