// import Tag from "../models/tag";
const Tag = require("../models/tag");

class TagsController {
    async getAll(req, res) {
        try {
            const tags = await Tag.find({});
            res.json(tags);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async getById(req, res) {
        try {
            const tag = await Tag.findById(req.params.id);
            res.json(tag);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async create(req, res) {
        try {
            let body = req.body;
            let { name, description, status } = body;
            console.log(req.body);
            if (!name) return res.status(400).json({ error: 'Name is required' })
            if (!description) return res.status(400).json({ error: 'Description is required' })
            let slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000);
            let data = { name, description, status, slug };
            const tag = await Tag.create(data);
            res.status(201).json(tag);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async update(req, res) {
        try {
            let body = req.body;
            let id = req.params.id;
            console.log(req.body);

            let data = {};
            let { name, description, status } = body;

            name && (data.name = name);
            description && (data.description = description);
            status && (data.status = status);
            name && (data.slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000));

            console.log(data);

            const tag = await Tag.findByIdAndUpdate(id, { ...body });
            if (!tag) return res.status(400).json({ error: 'Tag not found' })
            res.status(201).json(tag);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id;
            const tag = await Tag.findByIdAndDelete(id);
            if (!tag) return res.status(400).json({ error: 'tag not found' })
            return res.json(tag);
        }
        catch (error) {
            console.log(error);
            return (res.json(error))
        }
    }

}

module.exports = TagsController;