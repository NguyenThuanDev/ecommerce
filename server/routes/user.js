const express = require('express');
const {
    register,
    getAllUser,
    getCurrentUser,
    login,
    RefeshAccessToken,
    logout,
    forgetPassword,
    verifyChangeToken,
    updateCurrentUser,
    updateUserbyAdmin,
    deleteUser } = require('../controllers/user');

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
router.put("/change-info/:_id", verifyToken, isAdmin, updateUserbyAdmin)
router.delete("/:product_id", verifyToken, isAdmin, deleteUser)
module.exports = router;