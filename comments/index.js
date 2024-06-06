const express = require('express')
const { randomBytes } = require('crypto')
const app = express()
const cors = require('cors')
const axios  = require('axios')

app.use(express.json());
app.use(cors())


const PORT = 2000
const commentsByPostId = {}

app.get('/post/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',async (req, res) => {
    let commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    let comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4000/events',{
        type:'commentCreated',
        data:{
            id:commentId,
            content,
            postId:req.params.id
        }
    })

    res.status(201).json(comments)
})

app.post('/events',(req,res) => {
    console.log('recieved event',req.body.type)
    res.send({})
})

app.listen(PORT, () => {
    console.log(`server(comments) is running on port ${PORT}`)
})