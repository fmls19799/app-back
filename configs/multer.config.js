const multer = require('multer');
const path = require('path');

console.log('HEEEY AAQUI');

const storage = multer.diskStorage({
    destination: function(req, file, next) {
        console.log(req.file);
        console.log(req.files);
        console.log(file);
        
        
        next(null, './public/uploads/');
    },
    filename: function(req, file, next) {
        console.log(req.file);
        console.log(req.files);
        console.log(file);
        
        
        next(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;

