const asyncHandler = require("express-async-handler");
const Brand = require('../models/brand');

const createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        throw new Error("Missing payload");
    }
    const response = await Brand.create({
        name
    });
    res.status(200).json({
        success: response ? true : false,
        response
    })


});

const getBrandbyId = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const response = await Brand.findById(_id);
    res.status(200).json({
        success: response ? true : false,
        response
    })
})

const getBrands = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const response = await Brand.find({ name: { $regex: new RegExp(name, 'i') } });
    res.status(200).json({
        success: response ? true : false,
        response
    })
})

const updateBrand = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { name } = req.body;
    const response = await Brand.findByIdAndUpdate(_id, { name: name }, { new: true });
    res.status(200).json({
        success: response ? true : false,
        response

    })

});

const deleteBrand = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const response = await Brand.findByIdAndDelete(_id);
    res.status(200).json({
        success: response ? true : false,
        response
    })



})


module.exports = {
    createBrand,
    getBrandbyId,
    getBrands,
    updateBrand,
    deleteBrand

}