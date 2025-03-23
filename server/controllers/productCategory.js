const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        throw new Error("Missing payload")
    }
    const category = await ProductCategory.create(req.body);
    res.status(200).json({
        success: category ? true : false,
        category: category ? category : "Created failed"
    })


});

const getCategory = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const category = await ProductCategory.findById(_id);
    res.status(200).json({
        success: category ? true : false,
        category: category ? category : "Not found category with this id"
    })

})

const getCategories = asyncHandler(async (req, res) => {
    let { sort = "name", page, limit, name } = req.query;
    const query = ProductCategory.find({ name: { $regex: new RegExp(name, 'i') } });

    if (!limit) {
        limit = await ProductCategory.find({ name: { $regex: new RegExp(name, 'i') } }).countDocuments;
    }
    if (!page) {
        page = 1;
    }
    const offset = (page - 1) * limit;
    query.sort(sort);
    query.skip(offset);
    query.limit(limit)
    const productCategory = await query.exec();
    res.status(200).json({
        length: productCategory.length,
        productCategory
    })



});

const updateCategory = asyncHandler(async (req, res) => {
    const { _id, name } = req.body;
    const categoryUpdated = await ProductCategory.findByIdAndUpdate(_id, {
        name
    }, { new: true })
    res.status(200).json({
        success: categoryUpdated ? true : false,
        categoryUpdated: categoryUpdated ? categoryUpdated : "Not found category to update"
    })

})
const deleteCategory = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const deletedCategory = await ProductCategory.findByIdAndDelete(_id);
    res.status(200).json({
        success: deletedCategory ? true : false,
        deletedCategory: deletedCategory ? deletedCategory : "Deleted Failed"
    })


})


module.exports = {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory


}