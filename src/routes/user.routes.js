// import express from 'express';
// const router = express.Router();

// import UserController from '../controllers/user.controller';

const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = new Router();

const controller = new UserController();


// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/all', controller.getAll);


// @route   GET api/users/:id
// @desc    Get user by id
// @access  Public
router.get('/:id', controller.getById);


// @route   GET api/users/:email
// @desc    Get user by email
// @access  Public
router.get('/email/:email', controller.getByEmail);


// @route   GET api/users/search?
// @desc    Get users by search term
// @access  Public
router.get('/search', controller.search);


// @route   POST api/users
// @desc    Create user
// @access  Public



// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put('/update/:id', controller.update);


// @route   DELETE api/users/delete/:id
// @desc    Delete user
// @access  Private
router.delete('/delete/:id', controller.delete);


// @route   DELETE api/users/delete/all/confirm/:confirm
// @desc    Delete all users by adding /confirm/confirm to the end of the url
// @access  Private
router.delete('/delete/all/confirm/:confirm', controller.deleteAll);

module.exports = router;




