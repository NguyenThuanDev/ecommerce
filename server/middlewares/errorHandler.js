
const notFound = (req, res, next) => {
    const error = new Error(`Link ${req.originalUrl} is not found`);
    res.status(404);
    next(error);

}
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    if (process.env.ENVIRONMENT === 'development') {
        return res.status(statusCode).json({
            errorCode: statusCode,
            message: error.message,
            tracktrade: error.stack
        })

    }
    else {
        return res.status(statusCode).json({
            errorCode: statusCode,
            message: error.message,

        })
    }

}

module.exports = {
    notFound,
    errorHandler
}