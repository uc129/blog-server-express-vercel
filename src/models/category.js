const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    name: { type: String, required: true, trim: true, unique: true, index: true, min: 3, match: /[a-zA-Z0-9]/ },
    description: { type: String, required: true, trim: true, min: 3 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    slug: { type: String, required: true, trim: true, unique: true, index: true, min: 3, },
    meta: {
        numPosts: { type: Number, default: 0 },
        numLikes: { type: Number, default: 0 },
        numDislikes: { type: Number, default: 0 },
        numViews: { type: Number, default: 0 },
        numBookmarks: { type: Number, default: 0 },
        numShares: { type: Number, default: 0 },
        numReports: { type: Number, default: 0 },
    }

}, { timestamps: true });


const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;

