const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express() 


app.use(express.json())
app.use(cors())

const posts = {}
const handleEvent = (type , data) => {
    if (type === 'postCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }
    if (type === 'commentCreated') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        post.comments.push({ id, content, status })
    }

    if (type === 'commentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId]
        const comment = post.comments.find(comment => {
            return comment.id === id
        });
        comment.status = status
        comment.content = content
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type,data);
    
    res.send({});
})
const PORT = 3000;


app.listen(PORT,async () => {
    console.log(`server is running on ${PORT}`);

    let res = await axios.get('http://localhost:4000/events');
    for (const event of res.data) {
        console.log(event.type);
        handleEvent(event.type , event.data)
    } 
})
