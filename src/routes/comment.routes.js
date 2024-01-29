// import { Router } from "express";
// import CommentController from "../controllers/comment.controller";

const { Router } = require('express');
const CommentController = require('../controllers/comment.controller');

const router = new Router();

const controller = new CommentController();


// @route   GET api/post/comments/all
// @desc    Get all comments for a post
// @access  Public

router.get("/:postId/all", controller.getAll);

// @route   GET api/post/comments/:id
// @desc    Get comment by id

router.get("/:id", controller.getById);

// @route   POST api/post/comments/create
// @desc    Create comment
// @access  Private

router.post("/:postId/create", controller.create);

// @route   PUT api/post/comments/:id
// @desc    Update comment
// @access  Private

router.put("/update/:id", controller.update);

// @route   DELETE api/post/comments/delete/:id
// @desc    Delete comment
// @access  Private

router.delete("/delete/:id", controller.delete);

module.exports = router;


