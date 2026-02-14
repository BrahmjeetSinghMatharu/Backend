const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); // Crypto module is used to generate random bytes which will be used to generate a unique filename for the uploaded file, it is a built-in module in Node.js and does not require any installation

// Disk Storage is used to store the file on the disk, it takes an object as an argument which has two properties destination and filename, destination is the path where the file will be stored and filename is the name of the file which will be stored

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, name) => {
            const fn = name.toString('hex') + path.extname(file.originalname);
            cb(null, fn);
        })
    }
});

const upload = multer({ storage: storage });

module.exports = upload;