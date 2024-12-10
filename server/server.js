const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json())//middleware cho phép app đọc dữ liệu mà người dùng gửi lên dạng json
app.use(express.urlencoded({ extended: true }))
app.listen(port, () => {
    console.log(`App is running at: http://localhost:${port}`);


})
app.get("/", (req, res) => {
    res.status(200).json("Hello World!!")
})