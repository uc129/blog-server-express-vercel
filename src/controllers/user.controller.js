// import User from '../models/user'
// import { userValidator } from '../validators/user.validate';

const User = require('../models/user');
const { userValidator } = require('../validators/user.validate');


class UserController {
    createUserData({ userData }) {
        let UserData = {};
        const { name, email, password, role, status, tags } = data

        name && (userData.name = name);
        email && (userData.email = email);
        password && (userData.password = password);
        role && (userData.role = role);
        status && (userData.status = status);
        tags && (userData.tags = tags);

        return userData
    }


    async update({ req, res }) {

        const { errors } = userValidator({ userData: req.body, method: 'update' });

        if (!errors === null) {
            return res.status(400).json(errors);
        }

        let userData = this.createUserData({ userData: req.body });

        try {
            const user = await User.findByIdAndUpdate(req.params.id, userData, { new: true });
            return res.json(user);
        }
        catch (error) {
            return (res.json(error))
        }
    }


    async getAll({ req, res }) {
        try {
            const users = await User.find({});
            return res.json(users);
        } catch (error) {
            return (res.json(error))
        }
    }


    async getById({ req, res }) {
        try {
            const user = await User.findById(req.params.id);
            return res.json(user);
        } catch (error) {
            return (res.json(error))
        }
    }

    async getByEmail({ req, res }) {
        try {
            const user = await User.findOne({ email: req.params.email });
            return res.json(user);
        } catch (error) {
            return (res.json(error))
        }
    }

    async search({ req, res }) {

        const query = req.query;



        try {
            const users = await User.find(
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } }
            );
            return res.json(users);
        } catch (error) {
            return (res.json(error))
        }
    }



    async delete({ req, res }) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.json(user);
        }
        catch (error) {
            return (res.json(error))
        }
    }


    async deleteAll({ req, res }) {
        const confirm = req.params.confirm;
        if (!confirm || confirm !== 'confirm') {
            return res.json({ error: 'You must confirm this action by adding /confirm/confirm to the end of the url' });
        }
        try {
            const users = await User.deleteMany({});
            return res.json(users);
        }
        catch (error) {
            return (res.json(error))
        }
    }

}

module.exports = UserController;














