const route = require("express").Router();
const ctrls = require("../controllers/brand");
const middlewares = require("../middlewares/verifyToken");

route.post("/", middlewares.verifyToken, middlewares.isAdmin, ctrls.createBrand);
route.get("/", ctrls.getBrands);
route.get("/:_id", ctrls.getBrandbyId);
route.put("/:_id", middlewares.verifyToken, middlewares.isAdmin, ctrls.updateBrand);
route.delete("/:_id", middlewares.verifyToken, middlewares.isAdmin, ctrls.deleteBrand);
module.exports = route;