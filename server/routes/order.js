const router = require("express").Router();
const ctrls = require("../controllers/order");
const middlewares = require("../middlewares/verifyToken");

router.post("/", middlewares.verifyToken, ctrls.createOrder);


module.exports = router;