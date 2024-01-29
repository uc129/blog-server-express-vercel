const { Router } = require("express");
const router = new Router();
const UserAuthentication = require("../auth/auth.controller");
const controller = new UserAuthentication();

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post("/register", upload.none(), controller.register)

// @route   POST api/user/login
// @desc    Login user
// @access  Public
router.post("/login", upload.none(), controller.login)



// @route   POST api/user/logout
// @desc    Logout user
// @access  Public
router.post("/logout", upload.none(), controller.logout)


module.exports = router;

