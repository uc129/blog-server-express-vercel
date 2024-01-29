// import { Router } from 'express';

// import PostController from '../controllers/post.controller';

const { Router } = require('express');
const PostController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
});



const router = new Router();

const controller = new PostController();

// @route   GET api/posts
// @desc    Get all posts
// @access  Public

router.get('/all', controller.getAll);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

router.get('/:id', controller.getById);

// @route   GET api/posts/search?
// @desc    Get posts by search term
// @access  Public

// router.get('/search', controller.search);

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.post('/create', upload.none(), controller.create);

// @route   PUT api/posts/:id
// @desc    Update post
// @access  Private

// router.put('/update/:id', upload.none(), controller.update);

// @route   DELETE api/posts/delete/:id
// @desc    Delete post
// @access  Private

router.delete('/delete/:id', controller.delete);

//@route PATCH api/posts/:id/meta
//@desc Update post meta
//@access Private

// router.patch('/:id/meta', controller.updateMeta);




module.exports = router;
