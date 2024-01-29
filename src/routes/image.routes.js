const { Router } = require('express');
const ImageController = require('../controllers/image.controller');

const ImageRouter = new Router();
const controller = new ImageController();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   GET api/images
// @desc    Get all images
// @access  Public
ImageRouter.get('/all', controller.getAll);


// @route   GET api/images/:id
// @desc    Get image by id
// @access  Public
ImageRouter.get('/:id', controller.getById);


// @route   POST api/images
// @desc    Create image
// @access  Private
ImageRouter.post('/upload', upload.single('image'), controller.upload);


// @route   PUT api/images/:id
// @desc    Update image
// @access  Private
// ImageRouter.post('/update/:id', controller.update);


// @route   DELETE api/images/delete/:id
// @desc    Delete image
// @access  Private
// ImageRouter.delete('/delete/:id', controller.delete);


module.exports = ImageRouter;

