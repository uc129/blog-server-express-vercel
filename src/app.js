const express = require('express');
const env = require('dotenv');
env.config();

const CategoryRouter = require('./routes/category.routes');
const PostRoutes = require('./routes/post.routes');
const UserRoutes = require('./routes/user.routes');
const TagRoutes = require('./routes/tag.routes');
const AuthRoutes = require('./auth/auth.routes');
const ImageRouter = require('./routes/image.routes');

const cors = require('cors');
const ConnectDB = require('./database');
const session = require('express-session');

const crypto = require('crypto');
const app = express();
app.use(cors());

function genuuid() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const sess = {
    genid: function (req) {
        return genuuid() // use UUIDs for session IDs
    },
    secret: crypto.randomBytes(20).toString("hex"),
    cookie: {
        maxAge: 60000,
    },
    resave: false,
    saveUninitialized: true,
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello World! This is the blog api');
});

app.get('/api/v1', (req, res) => {
    res.json({
        message: "Welcome to the blog api",
        session: req.session,
        sessionID: req.sessionID
    });
});

app.use('/api/v1/blog/categories', CategoryRouter);
app.use('/api/v1/blog/posts', PostRoutes);
app.use('/api/v1/blog/user', UserRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/blog/tags', TagRoutes);
app.use('/api/v1/blog/images', ImageRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("http://localhost:" + port);
    ConnectDB()
})


module.exports = app;
