const mongoose = require('mongoose');
const connectDB = async () => {
    const mongoURI = 'mongodb://localhost:27017/ecommerce';
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,       // Đảm bảo tương thích với chuỗi kết nối
            useUnifiedTopology: true,   // Sử dụng engine theo dõi máy chủ mới nhất
        })
        console.log(mongoose.connection.readyState == 1 ? "Connection thành công" : "Thất bại");

    } catch (error) {
        console.log("Connect Error");
    }

}

module.exports = connectDB 

