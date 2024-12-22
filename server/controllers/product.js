const Product = require("../models/product");
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const path = require('path');
const xlsx = require("xlsx")
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length == 0 || !req.body.title) {
        throw new Error("Missing payload")
    }
    if (req.body.title) {
        req.body.slug = slugify(req.body.title, {
            replacement: '-',
            lower: true,
            strict: false,
            locale: 'vi',
            trim: true
        })
    }
    const newProduct = await Product.create(req.body);
    res.status(200).json({
        success: newProduct ? true : false,
        data: newProduct ? newProduct : "Create product Failed"
    })


});

const getProduct = async (req, res) => {
    const { _id } = req.params;
    try {
        const product = await Product.find({ _id });
        res.status(200).json({
            success: product ? true : false,
            productData: product ? product : "Cannot find product with this id"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            productData: "Cannot find product with this id"
        })
    }



}

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: products ? true : false,
        length: products.length,
        productData: products
    })



});
const updateProduct = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (Object.keys(req.body).length == 0) throw new Error("Missing payload");
    if (req.body.title) {
        req.body.slug = slugify(req.body.title, {
            replacement: '-',
            lower: true,
            strict: false,
            locale: 'vi',
            trim: true
        })
    }
    const productUpdated = await Product.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).json({
        success: productUpdated ? true : false,
        dataChanged: productUpdated


    })

});
const deleteProduct = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    console.log(_id)
    const deletedProduct = await Product.findByIdAndDelete(_id);
    console.log(deletedProduct)
    res.status(200).json({
        success: deleteProduct ? true : false,
        data: deletedProduct ? deletedProduct : "Cannot deleted this product"
    })


});
const importfile = asyncHandler(async (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Lấy tên sheet đầu tiên
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    data.forEach(async item => {
        item.slug = slugify(item.title, {
            replacement: '-',
            lower: true,
            strict: false,
            locale: 'vi',
            trim: true
        })
    })
    await Product.create(data)
    res.status(200).json({
        data
    })



});
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    importfile


}
