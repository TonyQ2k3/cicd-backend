require('dotenv').config()

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const {
    getPosts,
    getOnePost,
    createPost,
    deletePost
} = require('./controllers/postController')

const authRoutes = require('./controllers/authController');


app.get('/', (req, res) => {
    res.send("Backend is running!");
});

// Post routes

app.get('/posts/status', (req, res) => {
    res.send("Post Service is running!");
})
app.get('/posts/all', getPosts);
app.get('/posts/all/:id', getOnePost);
app.post('/posts', createPost);
app.delete('/posts/:id', deletePost);


// Auth routes

app.get('/set-cookie', (req, res) => {
    res.cookie('current_user', true);
    res.send("Cookie for user set");
});
app.get('/get-cookie', (req, res) => {
    const cookies = req.cookies;
    res.json(cookies);
})

app.use(authRoutes);


module.exports = app;