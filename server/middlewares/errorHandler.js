const notFound = (req, res, next) => {
    const error = new Error(`Link ${req.originalUrl} is not found`);
    res.status(404);
    next(error);


}
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
        errorCode: statusCode,
        message: error.message
    })

}

module.exports = {
    notFound,
    errorHandler
}