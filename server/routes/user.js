const express = require('express');
const { register, getAllUser, getCurrentUser, login, RefeshAccessToken, logout, forgetPassword, verifyChangeToken, updateCurrentUser } = require('../controllers/user');

const { verifyToken, isAdmin } = require("../middlewares/verifyToken")
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.get("/all", verifyToken, isAdmin, getAllUser);
router.get("/currentUser", verifyToken, isAdmin, getCurrentUser);
router.get("/refeshToken", RefeshAccessToken);
router.get("/logout", logout);
router.get("/forget-password", forgetPassword);
router.post("/change-password", verifyChangeToken);
router.put("/current-info", verifyToken, updateCurrentUser)
module.exports = router;