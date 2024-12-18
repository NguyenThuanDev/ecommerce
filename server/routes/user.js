const express = require('express');
const { register, getAllUser, getCurrentUser, login, RefeshAccessToken, logout, forgetPassword, verifyChangeToken } = require('../controllers/user');


const { verifyToken } = require("../middlewares/verifyToken")
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.get("/all", getAllUser);
router.get("/currentUser", verifyToken, getCurrentUser);
router.get("/refeshToken", RefeshAccessToken);
router.get("/logout", logout);
router.get("/forget-password", forgetPassword);
router.post("/change-password", verifyChangeToken);
module.exports = router;