const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = {
            id,
            title,
            comments: []
        }
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(com => com.id === id);

        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', async (req, res) => {
    try {
        const { type, data } = req.body;
        handleEvent(type, data);
        
    } catch (err) {
        throw new Error(err);
    }

    res.send({});
})

app.listen(4002, async () => {
    console.log('listening on 4002');
    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
        console.log('processing event:', event.type);

        handleEvent(event.type, event.data);
    }
})
