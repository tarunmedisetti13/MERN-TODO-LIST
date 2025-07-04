const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/')

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => console.log(err))
})
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await TodoModel.findById(req.params.id);
    TodoModel.findByIdAndUpdate({ _id: id }, { done: !todo.done })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.listen(3001, () => {
    console.log("Server is Running")
})
