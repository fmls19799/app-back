const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, next) {   
        // guardo en mi pc, cuando sea produccion CAMBIARLO???    
        next(null, './public/uploads/');
    },
    filename: function(req, file, next) {        
        // le pongo nombre al file
        next(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
module.exports = upload;

