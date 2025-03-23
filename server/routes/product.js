const express = require('express');
const multer = require("multer")
const { verifyToken, isAdmin } = require("../middlewares/verifyToken")
const {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    importfile,
    ratingProduct,
    setProductCategorybyCondition,
    uploadImages,
    importJson,
    getStat
} = require("../controllers/product")
const storage = require("../configs/upload.config")
const cloudStorage = require("../configs/cloudinary.config");

const upload = multer({ storage });
const uploadCloudinary = multer({ storage: cloudStorage })
const router = express.Router();
router.post("/import", upload.single("file"), importfile);
router.post("/imports", upload.single("file"), importJson);
router.post("/upload/:_id", verifyToken, isAdmin, uploadCloudinary.array("image"), uploadImages)
router.post("/", verifyToken, isAdmin, createProduct)
router.get("/", getProducts)
router.get("/:_id", getProduct)
router.post("/:_id", verifyToken, isAdmin, updateProduct);
router.put("/rating/:product_id", verifyToken, ratingProduct)
router.delete("/:_id", verifyToken, isAdmin, deleteProduct)
router.put("/setTag/", verifyToken, isAdmin, setProductCategorybyCondition)
router.get('/get/stats', getStat)

module.exports = router

