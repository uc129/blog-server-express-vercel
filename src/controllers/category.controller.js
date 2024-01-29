const Category = require('../models/category');

class CategoryController {

    async getAll(req, res) {
        try {
            const categories = await Category.find({});
            return res.json(categories);
        }
        catch (error) {
            return (res.json(error))
        }
    }

    async getById(req, res) {
        try {
            id = req.params.id;
            const category = await Category.findById(id);
            return res.json(category);
        }
        catch (error) {
            return (res.json(error))
        }
    }


    // const CategorySchema = new Schema({

    //     name: { type: String, required: true, trim: true, unique: true, index: true, min: 3, match: /[a-zA-Z0-9]/ },
    //     description: { type: String, required: true, trim: true, min: 3 },
    //     status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    //     slug: { type: String, required: true, trim: true, unique: true, index: true, min: 3, },
    //     meta: {
    //         numPosts: { type: Number, default: 0 },
    //         numLikes: { type: Number, default: 0 },
    //         numDislikes: { type: Number, default: 0 },
    //         numViews: { type: Number, default: 0 },
    //         numBookmarks: { type: Number, default: 0 },
    //         numShares: { type: Number, default: 0 },
    //         numReports: { type: Number, default: 0 },
    //     }

    // }, { timestamps: true });

    async create(req, res) {
        let body = req.body;
        console.log(req.body);

        if (!req.body) return res.status(400).json({ error: 'You must provide data to create a category' })
        let { name, description, status } = body;

        if (!name) return res.status(400).json({ error: 'Name is required' })
        if (!description) return res.status(400).json({ error: 'Description is required' })

        let slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000);

        let data = { name, description, status, slug };


        try {
            const category = await Category.create(data);
            return res.json(category);
        }
        catch (error) {
            return (res.json(error))
        }
    }


    async update(req, res) {

        console.log(req.body);

        try {
            let id = req.params.id;
            // console.log('id', id);
            let data = {};

            let body = req.body;
            console.log(req.body);

            let { name, description, status } = body;

            name && (data.name = name);
            description && (data.description = description);
            status && (data.status = status);
            name && (data.slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000));



            const category = await Category.findByIdAndUpdate(id, { ...data });
            if (!category) return res.status(400).json({ error: 'Category not found' })
            return res.json(category);
        }
        catch (error) {
            console.log(error);
            return (res.json(error))
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id;
            const category = await Category.findByIdAndDelete(id);
            if (!category) return res.status(400).json({ error: 'Category not found' })
            return res.json(category);
        }
        catch (error) {
            console.log(error);
            return (res.json(error))
        }
    }


}

module.exports = CategoryController;