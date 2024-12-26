const router = require("express").Router();
const middleware = require("../middlewares/verifyToken");
const contrls = require("../controllers/blog");
router.post("/", middleware.verifyToken, middleware.isAdmin, contrls.createBlog);
router.put("/:_id", middleware.verifyToken, middleware.isAdmin, contrls.updateBlog)
router.delete("/:_id", middleware.verifyToken, middleware.isAdmin, contrls.deleteBlog)
router.get("/", contrls.getBlogs);
router.get("/:_id", contrls.getBlogbyId)
router.get("/like/:_id", middleware.verifyToken, middleware.isAdmin, contrls.addLike)
router.get("/dislike/:_id", middleware.verifyToken, middleware.isAdmin, contrls.adddisLike)
module.exports = router