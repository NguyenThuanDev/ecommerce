const express = require('express');
const app = express();
const connectDB = require("./configs/dbconnection");
const cookieParse = require("cookie-parser");
const cors = require('cors');
const compression = require('compression')
const port = process.env.PORT || 8080;
const initRoute = require('./routes')
app.use(express.json())//middleware cho phép app đọc dữ liệu mà người dùng gửi lên dạng json
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(compression())
connectDB();
app.use(
    cors({
        origin: process.env.CLIENT_URL, // Chỉ cho phép các domain này
        methods: ["GET", "POST", "PUT", "DELETE"], // Giới hạn các method được phép
    })
);
app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);


})
initRoute(app)