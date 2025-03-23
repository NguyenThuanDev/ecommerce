const multer = require("multer")
const path = require("path")
const slugify = require('slugify');
const storage = multer.diskStorage({
    // Nơi lưu file
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // Đặt lại tên file
    filename: (req, file, cb) => {
        const filename = slugify(file.originalname.split(".")[0], {
            replacement: '-',
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        })
        cb(null, `${filename}${path.extname(file.originalname)}`);
    },
});
module.exports = storage;
