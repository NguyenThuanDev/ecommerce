const { response } = require("express");
const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler")


const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
        throw new Error("Missing payload");
    }
    const response = await Blog.create(req.body);
    res.status(200).json({
        success: response ? true : false,
        response
    })


});

const updateBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (Object.keys(req.body).length == 0) throw new Error("Missing payload");
    const response = await Blog.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json({
        success: response ? true : false,
        response


    })


});
const deleteBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const response = await Blog.findByIdAndDelete(_id);
    res.status(200).json({
        success: response ? true : false,
        reponse
    })



});
//Mỗi lần getBlog thì phải show rõ ai là người thích, dislike => populate với bảng user đế lấy dữ liệu, đồng thời tăng lượt view lên
const getBlogbyId = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const seletedFieldPopulate = "firstname lastname"
    const reponse = await Blog.findByIdAndUpdate(_id,
        { $inc: { totalView: 1 } }, { new: true })
        .populate("liked", seletedFieldPopulate)
        .populate("disliked", seletedFieldPopulate);
    res.status(200).json({
        success: response ? true : false,
        reponse
    })




})

const getBlogs = asyncHandler(async (req, res) => {
    let { sort, page = 1, fields, limit, ...filter } = req.body;
    if (!req.body) {
        throw new Error("Missing payload!!");
    }
    const filterOption = {
        $or:
            [
                { "title": { $regex: String(filter["title"]) } },
                {
                    "description": { $regex: String(filter["description"]) }

                }]
    }
    const query = Blog.find(filterOption);
    if (!sort) {
        sort = "title"
    }
    else {
        sort = sort.split(",").join(" ");
    }
    if (!fields) {
        fields = "-createdAt -updatedAt -__v -id"
    }
    else {
        fields = fields.split(",").join(" ");
    }
    const total = await Blog.find(filterOption).countDocuments();

    if (!limit) {
        limit = total;
    }
    const offset = (page - 1) * limit;

    query.sort(sort);
    query.select(fields);
    query.skip(offset);
    query.limit(limit)
    const reponse = await query.exec()

    res.status(200).json({
        reponse,
        count: reponse.length
    })




});

const addLike = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;
    const { _id } = req.params;
    const blog = await Blog.findById(_id);
    let like = blog["liked"];
    let dislike = blog["disliked"]
    //Có like thì bỏ like; 
    if (like.indexOf(userId) == -1) {

        if (dislike.indexOf(userId) != 1) {
            like.push(userId);
            dislike.splice(dislike.indexOf(userId), 1)
        }
        else {
            like.push(userId);
        }

    }
    else {
        like.splice(like.indexOf(userId), 1)
    }

    await blog.save()
    res.status(200).json({ blog })



})

const adddisLike = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;
    const { _id } = req.params;
    const blog = await Blog.findById(_id);
    let like = blog["liked"];
    let dislike = blog["disliked"]
    //Có like thì bỏ like; 
    if (dislike.indexOf(userId) == -1) {

        if (like.indexOf(userId) != 1) {
            dislike.push(userId);
            like.splice(like.indexOf(userId), 1)
        }
        else {
            dislike.push(userId);
        }

    }
    else {
        dislike.splice(dislike.indexOf(userId), 1)
    }

    await blog.save()
    res.status(200).json({ blog })



})

const uploadImageBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (!req.file) {
        throw new Error("Please to Image to upload")
    }
    const response = await Blog.findByIdAndUpdate(_id, { images: req.file.path }, { new: true });
    res.status(200).json({
        success: response ? true : false,
        response
    })



})



module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogbyId,
    getBlogbyId,
    getBlogs,
    addLike,
    adddisLike,
    uploadImageBlog

}