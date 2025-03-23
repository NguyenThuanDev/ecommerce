const Coupon = require("../models/coupon");
const Product = require("../models/product");
const ProductCategory = require('../models/productCategory');
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) => {
    const { title, type, expired, productCategory, valueDiscount } = req.body;
    if (!title || !type || !expired || !productCategory || !valueDiscount) {
        throw new Error("Missing payload");
    }
    req.body.expired = Date.now() + req.body.expired * 24 * 60 * 60 * 1000;

    if (productCategory === "All") {
        var isAppliedAll = true;
    }
    else {
        const { _id: categoryId } = await ProductCategory.findOne({ name: productCategory }).select("_id");
        console.log(categoryId)
        if (!categoryId) {
            throw new Error("Không tìm thấy sản phẩm phù hợp để apply Coupon")
        }
        isAppliedAll = false;
        const productId = await Product.find({ category: categoryId }).select("_id");
        var productApplied = productId.map(item => item["_id"])
    }

    const coupon = await Coupon.create({
        title: title,
        type: type,
        expired: req.body.expired,
        productApplied: productApplied,
        valueDiscount: valueDiscount,
        isAppliedAll: isAppliedAll

    })
    res.status(200).json({
        success: coupon ? true : false,
        coupon
    })



});

const updateCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (req.body.expired) {
        req.body.expired = Date.now() + req.body.expired * 24 * 60 * 60 * 1000;
    }
    if (req.body.productCategory) {
        const { _id: categoryId } = await ProductCategory.findOne({ name: req.body.productCategory }).select("_id");
        if (!categoryId) {
            throw new Error("Không tìm thấy sản phẩm phù hợp để apply Coupon")
        }
        const productId = await Product.find({ category: categoryId }).select("_id");
        const productApplied = productId.map(item => item["_id"])
        req.body.productApplied = productApplied;
    }
    console.log(req.body)
    const repsonse = await Coupon.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({
        success: repsonse ? true : false,
        repsonse



    })


});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const response = await Coupon.findByIdAndDelete(_id);
    res.status(200).json({
        success: response ? true : false,
        response
    })


})

const getCouponById = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const response = await Coupon.findById(_id);
    res.status(200).json({
        success: response ? true : false,
        response
    })




})

module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponById


}
