const express = require("express")
const mongoose = require('mongoose')


const app = express()
const port = 3000
app.use(express.json())


const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
})

//Funções - CRUD

//create
app.get("/", async (req, res) => {
    const films = await Film.find()
    return res.send(films)
})

//delete
app.delete("/:id", async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id)
    return res.send(film)
})

app.put("/:id", async(req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    }, {
        new: true
    })

    return res.send(film)
})


//read 
app.post("/", async (req,res) => {
    const film = new Film({
        title:req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    await film.save()
    return res.send(film)
})



app.listen(port, () => {
    mongoose.connect('mongodb+srv://luiz:L7e17pTXET8yqUY7@startwars-api.bvwvoho.mongodb.net/?retryWrites=true&w=majority&appName=startwars-api')
    console.log('App running')
})