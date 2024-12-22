const userRoute = require('./user');
const { notFound, errorHandler } = require('../middlewares/errorHandler')
const productRoute = require("./product")
const initRoute = (app) => {
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/product', productRoute)
    app.use(notFound)
    app.use(errorHandler);

}
module.exports = initRoute;