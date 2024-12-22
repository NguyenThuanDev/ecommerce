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
    ratingProduct
} = require("../controllers/product")
const path = require("path")
const slugify = require('slugify');
const storage = multer.diskStorage({
    // Nơi lưu file
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // Đặt lại tên file
    filename: (req, file, cb) => {
        const filename = slugify(file.originalname.split(".")[0], {
            replacement: '-',
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        })
        cb(null, `${filename}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });
const router = express.Router();
router.post("/import", upload.single("file"), importfile)
router.post("/", verifyToken, isAdmin, createProduct)
router.get("/", getProducts)
router.get("/:_id", getProduct)
router.post("/:_id", verifyToken, isAdmin, updateProduct);
router.put("/rating/:product_id", verifyToken, ratingProduct)
router.delete("/:_id", verifyToken, isAdmin, deleteProduct)

module.exports = router

