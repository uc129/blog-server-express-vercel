// import { Router } from "express";
// import CategoryController from "../controllers/category.controller";

const { Router } = require('express');
const CategoryController = require('../controllers/category.controller');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});

const CategoryRouter = new Router();
const controller = new CategoryController();

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
CategoryRouter.get('/all', controller.getAll);


// @route   GET api/categories/:id
// @desc    Get category by id
// @access  Public
CategoryRouter.get('/:id', controller.getById);


// @route   POST api/categories
// @desc    Create category
// @access  Private
CategoryRouter.post('/create', upload.none(), controller.create);


// @route   PUT api/categories/:id
// @desc    Update category
// @access  Private
CategoryRouter.post('/update/:id', upload.none(), controller.update);


// @route   DELETE api/categories/delete/:id
// @desc    Delete category
// @access  Private
CategoryRouter.delete('/delete/:id', controller.delete);

module.exports = CategoryRouter;



