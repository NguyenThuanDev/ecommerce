const Product = require("../models/product");
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const path = require('path');
const xlsx = require("xlsx")
const fs = require('fs');
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
//Get product with filter, sorting, field option
const getProducts = asyncHandler(async (req, res) => {
    let { sort, page = 1, limit, field, ...filter } = req.query;

    let queryString = JSON.parse(JSON.stringify(filter).replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`));
    if (queryString.title) {
        queryString['title'] = { $regex: new RegExp(queryString.title, 'i') }
    }
    const query = Product.find(queryString);
    if (!sort) {
        sort = "-price";
    }
    else {
        sort = sort.split(",").join(" ");
    }
    if (!field) {
        field = "products brand price images"
    }
    else {
        field = field.split(",").join(" ")
    }
    const offset = (page - 1) * limit
    console.log(sort)
    query.sort(sort)
    query.select(field)
    if (page && limit) {
        query.skip(offset)
        query.limit(limit)
    }


    const products = await query.exec();
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
    fs.unlink(filePath, () => res.status(200).json({
        data
    }))




});

//Code tính năng đánh giá sản phẩm, mỗi user chỉ được phép đánh giá 1 lần

const averageRating = (array) => {
    let sum = array.reduce((total, currentValue) => {
        return total += currentValue;
    }, 0)
    return sum / array.length;
}
const ratingProduct = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { product_id } = req.params;
    const { star, comment } = req.body;
    if (!_id) {
        throw new Error("Please login to comment")
    }
    if (!star || !comment) {
        throw new Error("Missing payload")
    }
    const data = {
        star,
        postedBy: _id,
        comment
    }
    const product = await Product.findById(product_id);
    const ratingByPersonId = product.ratings.filter(item => {
        return item.postedBy.toString() === _id;
    }).length;
    if (ratingByPersonId > 0) {
        const index = product.ratings.findIndex(item => {
            return item.postedBy.toString() === _id;
        });
        product.ratings[index] = data
        let starArray = [...product.ratings];
        let result = [];
        starArray.forEach(item => {
            result.push(item.star);
        })
        product.totalRatings = Math.round(averageRating(result), 2);
        await product.save();
        return res.status(200).json({
            success: true,
            data: product.ratings
        })
    }

    product.ratings.push(data);
    const starArray = [...product.ratings];
    const result = [];
    starArray.forEach(item => {
        result.push(item.star);
    })
    product.totalRatings = Math.round(averageRating(result), 2);
    await product.save();
    res.status(200).json({
        success: true,
        data: product.ratings
    })




})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    importfile,
    ratingProduct


}
