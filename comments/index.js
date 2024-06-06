const express = require('express')
const { randomBytes } = require('crypto')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(express.json());
app.use(cors())


const PORT = 2000
const commentsByPostId = {}

app.get('/post/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    let commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    let comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4000/events', {
        type: 'commentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).json(comments)
})

app.post('/events',async (req, res) => {
    console.log('recieved event', req.body.type)
    const { type, data } = req.body
    if (type === 'commentModerated') {
        const { postId, status, id , content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status
        await axios.post('http://localhost:5000/events',{
            type:'commentModerated',
            data:{
                id,
                postId,
                status,
                content
            }
        })
    }
    res.send({})
})

app.listen(PORT, () => {
    console.log(`server(comments) is running on port ${PORT}`)
})