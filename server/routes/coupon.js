const router = require("express").Router();
const ctrls = require("../controllers/coupon");
const middlewares = require("../middlewares/verifyToken")
router.get("/:_id", ctrls.getCouponById)
router.post("/", middlewares.verifyToken, middlewares.isAdmin, ctrls.createCoupon);
router.put("/:_id", middlewares.verifyToken, middlewares.isAdmin, ctrls.updateCoupon);
router.delete("/:_id", middlewares.verifyToken, middlewares.isAdmin, ctrls.deleteCoupon);
module.exports = router;