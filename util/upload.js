const aws = require("aws-sdk");
const multer  = require('multer');
const multerS3 = require("multer-s3");
const path = require("path");
const { v4: uuidv4 } = require('uuid');


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_Access_Key_Id,
    secretAccessKey: process.env.AWS_Secret_Key
});

const multerStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images/books");
    },
    filename: (req, file, callback) => {
        const extension = file.mimetype.split("/")[1];
        const originName = file.originalname.split(" ")[0].trim();
        console.log(originName)
        callback(null, `book-${originName}-${Date.now()}.${extension}`);
    }
})
   
const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    } else {
        return cb(new Error("Please upload an image of type, jpg/jpeg/png"), false);
    }
}

// const upload = multer({
//     storage: multerStorage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter:multerFilter
// })


// const upload = multer({
//     fileFilter:multerFilter,
//     storage: multerS3({
//       acl: "public-read",
//       s3,
//       bucket: process.env.AWS_BUCKET_NAME,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldName });
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString());
//       },
//     }),
//   });
const upload = multer({
    fileFilter:multerFilter,
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname})
      },
      key: (req, file, cb) => {
        
        cb(null, `${"books"}/${uuidv4()}` + file.originalname)
        // cb(null, Date.now().toString() + file.originalname)
      }
    })
  })
module.exports = { upload }