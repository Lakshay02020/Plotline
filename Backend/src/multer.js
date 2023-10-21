const multer = require('multer')
const path = require('path')

//Admin
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/Static/images/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;