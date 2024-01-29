// import { userValidator } from "../validators/user.validate";
// import User from "../models/user";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import env from 'dotenv';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const User = require('../models/user');
const { userValidator } = require('../validators/user.validate');
const crypto = require('crypto');


env.config();


class UserAuthentication {

    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.createUserData = this.createUserData.bind(this);
        this.genuuid = this.genuuid.bind(this);
    }

    genuuid() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    createUserData({ userData }) {
        let user = {};
        const { name, email, password, role, status, tags } = userData

        name && (user.name = name);
        email && (user.email = email);
        password && (user.password = password);
        role && (user.role = role);
        status && (user.status = status);
        tags && (user.tags = tags);

        return userData
    }

    async register(req, res) {
        const { errors } = userValidator({ userData: req.body, method: 'create' });
        if (!errors === null) {
            console.log(errors);
            return res.status(400).json(errors);
        }
        let userData = this.createUserData({ userData: req.body });
        userData.status = 'online'

        try {
            const user = await User.create(userData);
            console.log(user);


            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: 'online',
                }
            }


            // Use a Promise to handle asynchronous jwt.sign
            const token = await new Promise((resolve, reject) => {
                jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 360000 }, (error, signedToken) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(signedToken);
                    }
                });
            });

            const sessionId = this.genuuid();
            req.session.userId = user.id;

            res.cookie('sessionId', sessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Set to true in a production environment
                maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
            });

            payload.user.token = token;
            res.json({ success: true, message: 'Registration successful', user: payload.user });

            return
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return
        }
    }

    async login(req, res) {

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ msg: "Failed Authentication, Invalid credentials, Please Try Again" });
            }

            user.status = 'online';
            await user.save();


            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: 'online',
                }
            }
            // Use a Promise to handle asynchronous jwt.sign
            const token = await new Promise((resolve, reject) => {
                jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 360000 }, (error, signedToken) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(signedToken);
                    }
                });
            });
            const sessionId = this.genuuid();
            req.session.userId = user.id;

            res.cookie('sessionId', sessionId, {
                httpOnly: true,
                expires: new Date(Date.now() + 3600000),
                secure: process.env.NODE_ENV === 'production', // Set to true in a production environment
                maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
            });
            payload.user.token = token;

            res.json({ success: true, message: 'Login successful', user: payload.user });

        }
        catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return
        }
    }


    async logout(req, res) {

        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            } else {
                // Clear the session cookie on the client side
                res.clearCookie('sessionId');
                res.json({ success: true, message: 'Logout successful' });
            }
        });
        req.user = null;
    }


}


module.exports = UserAuthentication;