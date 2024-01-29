const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tag = require('./tag');
const bcrypt = require('bcryptjs');



const UserSchema = new Schema({
    name: { type: String, required: true, trim: true, index: true, min: 3, match: /[a-zA-Z0-9]/ },
    email: { type: String, required: true, trim: true, index: true, min: 3, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true, trim: true, min: 3 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['online', 'offline', 'inactive'], default: 'offline' },

    meta: {
        likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        views: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        shares: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        reports: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },

    tags: [{
        type: Schema.Types.ObjectId, ref: 'Tag',
        validate: {
            validator: async function (value) {
                return await Tag.findById(value) != null;
            }, message: 'Invalid Tag'
        }
    }],


}, { timestamps: true });


UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
