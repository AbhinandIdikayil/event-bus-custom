const express = require('express')
const {randomBytes} = require('crypto')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(express.json());
app.use(cors())
const PORT = 1000
const posts = {}

app.get('/posts',(req,res) => {
    res.send(posts)
})

app.post('/posts',async (req,res) => {
    const {title} = req.body
    const id = randomBytes(4).toString('hex')
    posts[id] = {
        id,
        title
    }
    await axios.post('http://localhost:4000/events',{
        type:'postCreated',
        data:{
            id,title
        }
    })
    res.status(200).json(posts[id])
})

app.post('/events',(req,res) => {
    console.log('recieved events',req.body.type)
    res.send({})
})
 
app.listen(PORT,() => {
    console.log(`server(posts) is running on port ${PORT}`)
})