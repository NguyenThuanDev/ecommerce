const router = require("express").Router();
const middleware = require("../middlewares/verifyToken");
const contrls = require("../controllers/blog");
const multer = require("multer")
const cloudStorage = require("../configs/cloudinary.config");

const upload = multer({ storage: cloudStorage });
router.post("/", middleware.verifyToken, middleware.isAdmin, contrls.createBlog);
router.put("/:_id", middleware.verifyToken, middleware.isAdmin, contrls.updateBlog)
router.delete("/:_id", middleware.verifyToken, middleware.isAdmin, contrls.deleteBlog)
router.get("/", contrls.getBlogs);
router.get("/:_id", contrls.getBlogbyId)
router.get("/like/:_id", middleware.verifyToken, middleware.isAdmin, contrls.addLike)
router.get("/dislike/:_id", middleware.verifyToken, middleware.isAdmin, contrls.adddisLike)
router.post("/upload/:_id", middleware.verifyToken, middleware.isAdmin, upload.single("image"), contrls.uploadImageBlog);
module.exports = router