const path = require('path');
const multer = require("multer");

// ************ Path Image & Generate Name Image ************
const storageProduct =  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/products/');
    },
    filename: function (req, file, cb) {
      let fileExtension = path.extname(file.originalname);
      const newFile = file.fieldname + '-' + Date.now() + fileExtension;
      cb(null, newFile)
    }
  });

  const storageAvatar =  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/avatars/');
    },
    filename: function (req, file, cb) {
      let fileExtension = path.extname(file.originalname);
      const newFile = file.fieldname + '-' + Date.now() + fileExtension;
      cb(null, newFile)
    }
  });
  
  const uploadProduct = multer({ storage: storageProduct });
  const uploadAvatar = multer({ storage: storageAvatar });

  module.exports = {
    uploadProduct,
    uploadAvatar,
    path 
};