const express = require('express')
const axios = require('axios')

const app = express()

app.use(express.json())

const PORT = 5000

app.post('/events',async(req,res) => {
    const {type,data} = req.body
    if(type === 'commentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        await axios.post(`http://localhost:4000/events`,{
            type: 'commentModerated',
            data:{
                id:data.id,
                postId:data.postId,
                status,

                content:data.content
            }
        })
    }
    res.send({})
})

app.listen(PORT , () => {
    console.log(`server(moderation) is running on ${PORT}`)
})   