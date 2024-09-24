// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Define task schema and model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, default: 'Pending' },
    timestamp: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.post('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/newTask', async (req, res) => {
    console.log(req.body);
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
