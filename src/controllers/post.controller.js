const Post = require('../models/post');
const { postValidator } = require('../validators/post.validate');
const Comment = require('../models/comment');

class PostController {

    async create(req, res) {
        // const { title,  } = req.body;
        const { title, content, images, category, tags, status } = req.body;
        console.log('req.body', req.body);
        let data = req.body;
        let slug = '';

        title && (slug = title.toLowerCase().replace(/ /g, '-') + '-' + Date.now());

        data = { ...data, slug, title, content, category, tags, status };
        console.log('data', data);
        data.images = []
        images && images.forEach(image => data.images.push(image))

        const { errors } = postValidator({ postData: data }, 'create');

        if (errors) {
            res.status(400).json(errors);
            console.log(errors);
            return;
        }

        try {
            const post = await Post.create(data);
            console.log(post);
            res.json(post);
            return
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            return
        }
    }


    async getAll(req, res) {
        try {
            const posts = await Post.find({});
            return res.json(posts);
        }
        catch (error) {
            return (res.json(error))
        }
    }

    async getById(req, res) {
        try {
            let postId = req.params.id;
            const post = await Post.findById(postId);
            return res.json(post);
        }
        catch (error) {
            console.log(error);
            return (res.json(error))
        }
    }



    async getByTag(req, res) {
        try {
            let tag = req.params.tag;
            console.log('tag', tag);
            const posts = await Post.find({ tags: tag });
            return res.json(posts);
        }
        catch (error) {
            console.log(error);
            return (res.json(error))
        }
    }


    async getByCategory(req, res) {
        try {
            let category = req.params.category;
            console.log('category', category);
            const posts = await Post.find({ category: category });
            return res.json(posts);
        }
        catch (error) {
            console.log(error);
            return (res.json(error))
        }
    }


    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            return res.json(post);
        }
        catch (error) {
            return (res.json(error))
        }
    }



    async handleMeta(req, res) {
        const { query, params, user } = req;
        const postId = params.id;

        const addUniqueUser = (array, user) => (array.includes(user) ? array : [...array, user]);
        const removeUser = (array, user) => array.filter(item => item !== user);

        try {
            let post = await Post.findById(postId);

            const handleLikeDislike = (queryParam, metaArray, oppositeArray) => {
                if (query[queryParam]) {
                    post.meta[metaArray] = addUniqueUser(post.meta[metaArray], user);
                    post.meta[oppositeArray] = removeUser(post.meta[oppositeArray], user);
                }
            };

            handleLikeDislike("like", "likes", "dislikes");
            handleLikeDislike("dislike", "dislikes", "likes");

            const handleMetaAction = (queryParam, metaArray, addAction) => {
                if (query[queryParam] && !post.meta[metaArray].includes(user)) {
                    post.meta[metaArray].push(user);
                    addAction();
                }
            };

            handleMetaAction("view", "views", () => { });
            handleMetaAction("bookmark", "bookmarks", () => { });

            if (query.share && !post.meta.shares.to.includes(query.to)) {
                post.meta.shares.by = user;
                post.meta.shares.to.push(query.to);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }


    async handleSearch(req, res) {
        // api/posts/search?term=lorem
        const { query } = req;
        try {
            const posts = await Post.find({ $text: { $search: query.term } });
            return res.json(posts);
        } catch (error) {
            return res.status(500).json(error);
        }
    }


    // async handleComment(req,res) {
    //     const { comment, user } = req.body;
    //     const postId = req.params.id;

    //     try {
    //         const post = await Post.findById(postId);

    //         if (!post) {
    //             return res.status(404).json({ error: 'Post not found' });
    //         }

    //         const postComments = post.comments;

    //         // Check if comment ID already exists in the post's comments array
    //         const commentExists = postComments.includes(comment);

    //         if (comment && !commentExists) {
    //             post.comments.push({ comment, user });
    //             await post.save();
    //         }

    //         return res.json(post);
    //     } catch (error) {
    //         return res.status(500).json({ error });
    //     }
    // }

}

module.exports = PostController;