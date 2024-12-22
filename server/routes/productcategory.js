const express = require('express');
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory } = require("../controllers/productCategory")
const router = express.Router();
router.post("/", verifyToken, isAdmin, createCategory)
router.get("/:_id", getCategory);
router.get("/", getCategories);
router.put("/", verifyToken, isAdmin, updateCategory);
router.delete("/:_id", verifyToken, isAdmin, deleteCategory)
module.exports = router