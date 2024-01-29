// import { Router } from "express";

// import TagController from "../controllers/tags.controller";

const multer = require('multer');

const { Router } = require('express');
const TagController = require('../controllers/tags.controller');
const router = new Router();
const upload = multer({
    dest: 'uploads/'
});

const controller = new TagController();

// @route   GET api/tags
// @desc    Get all tags
// @access  Public

router.get('/all', controller.getAll);


// @route   GET api/tags/:id
// @desc    Get tag by id
// @access  Public

router.get('/:id', controller.getById);


// @route   POST api/tags
// @desc    Create tag
// @access  Private

router.post('/create', upload.none(), controller.create);


// @route   PUT api/tags/:id
// @desc    Update tag
// @access  Private

router.post('/update/:id', upload.none(), controller.update);


// @route   DELETE api/tags/delete/:id
// @desc    Delete tag
// @access  Private

router.delete('/delete/:id', controller.delete);

module.exports = router;
