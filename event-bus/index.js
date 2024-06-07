const { default: axios } = require('axios')
const express = require('express')




const PORT = 4000
const app = express()    

 
app.use(express.json())

const events =[];

app.post('/events',(req,res) => {
    const event = req.body

    events.push(event)

    axios.post(`http://localhost:1000/events`,event)
    axios.post(`http://localhost:2000/events`,event)
    axios.post(`http://localhost:3000/events`,event)
    axios.post(`http://localhost:5000/events`,event)

    res.send({status:'ok'})
})

app.get('/events',(req,res) => {
    res.send(events)
})
app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
})