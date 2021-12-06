// const fs = require('fs').promises
// const AWS = require('aws-sdk');
// const sharp = require('sharp');
// const { v4: uuidv4 } = require('uuid');

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_Access_Key_Id,
//     secretAccessKey: process.env.AWS_Secret_Key
// })

// const uploadImage = async (req, res, next) => {
//     // let myFile = req.file.originalname.split(".");
//     // const fileType = myFile[myFile.length - 1];
//     const file = await sharp(req.file.buffer).rotate().resize(300, 450, { fit: "fill" }).png().toBuffer();
//     const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: `${"books"}/${uuidv4()}.png`,
//         Body: file,
//         ACL: "public-read",
//     };
//     s3.upload(params, (error, data) => {
//         if (error) {
//             console.log(error, 'upload')
//             res.status(500).send(error);
//         }
//         req.uploads = data;
//         next();
//     })
// }

// module.exports = { uploadImage }
