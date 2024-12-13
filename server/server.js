const express = require('express');
const app = express();
const connectDB = require("./configs/dbconnection");
const port = process.env.PORT || 8080;
const initRoute = require('./routes')
app.use(express.json())//middleware cho phép app đọc dữ liệu mà người dùng gửi lên dạng json
app.use(express.urlencoded({ extended: true }))
connectDB();
app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);


})
initRoute(app)