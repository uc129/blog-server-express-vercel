const Image = require('../models/image');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// const uploadImage = async ({ title, buffer }) => {
//     let url;
//     cloudinary.uploader.upload(buffer, {
//         resource_type: "image",
//         public_id: title + "_" + Date.now(),
//         overwrite: true,
//     }).then((result) => {
//         console.log(result);
//         url = result.url;
//     }).catch((error) => {
//         console.log(error);
//         return
//     })
//     return url;
// }



// const byteArrayBuffer = fs.readFileSync('shirt.jpg');











class ImageController {


    async getAll(req, res) {
        try {
            // const images = await Image.find().populate('artist', 'username');
            const images = await Image.find({});
            if (!images) {
                return res.status(404).json({ message: 'Images not found' });
            }
            res.json(images);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }


    async getById(req, res) {
        try {
            const image = await Image.findById(req.params.id);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.json(image);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }



    async upload(req, res) {
        try {
            let imageBuffer;
            let image = req.file;

            if (req.file) {
                imageBuffer = req.file.buffer;
            }
            const buffer = new Buffer.from(imageBuffer, 'base64');
            if (!req.file) { console.log("No file uploaded"); return };
            if (!req.body) { console.log("Error, no body"); return };
            if (!imageBuffer) { console.log("Error, no image buffer"); return };

            let slug;

            let imageDetails = {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                primary: req.body.primary,
                status: req.body.status,
            }
            // const { title, description, category, primary, status } = req.body;

            let url = '';
            await new Promise((resolve) => {
                cloudinary.uploader.upload_stream((error, uploadResult) => {
                    return resolve(uploadResult);
                }).end(buffer);
            }).then((uploadResult) => {
                console.log(`Buffer upload_stream wth promise success - ${uploadResult.public_id}`);
                url = uploadResult.secure_url;
                slug = uploadResult.public_id;
            });

            if (!url) {
                console.log("Error, image not uploaded");
                res.status(500).json({ message: 'Error, image not uploaded' });
                return
            }

            imageDetails.url = url;
            imageDetails.slug = slug;


            const upload_image = await Image.create(imageDetails);
            if (!image) {
                console.log("Error, image not created");
                res.status(500).json({ message: 'Error, image not created' });
                return
            }
            res.json(upload_image);
            console.log(upload_image, 'upload_image');
            return


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }











}

module.exports = ImageController;
