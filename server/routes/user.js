const express = require('express');
const { register, getAllUser, getCurrentUser, login } = require('../controllers/user');


const { verifyToken } = require("../middlewares/verifyToken")
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.get("/all", getAllUser);
router.get("/currentUser", verifyToken, getCurrentUser)
module.exports = router;