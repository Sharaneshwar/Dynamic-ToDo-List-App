require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // MySQL2 with promises

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release(); // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new task
app.post('/newTask', async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;

    try {
        console.log('Creating new task:', req.body);
        const [result] = await pool.query(
            'INSERT INTO tasks (title, description, status, priority, dueDate, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description || '', status || 'Pending', priority || 'Low', dueDate ? new Date(dueDate) : null, new Date()]
        );
        const newTaskId = result.insertId;

        const [newTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [newTaskId]);
        res.json(newTask[0]);
    } catch (err) {
        console.error('Error creating new task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    try {
        await pool.query(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, dueDate = ? WHERE id = ?',
            [title, description || '', status, priority, dueDate ? new Date(dueDate) : null, id]
        );

        const [updatedTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
        res.json(updatedTask[0]);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit a task
app.put('/tasks/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, dueDate } = req.body;

    try {
        await pool.query(
            'UPDATE tasks SET title = ?, description = ?, priority = ?, dueDate = ? WHERE id = ?',
            [title, description || '', priority, dueDate ? new Date(dueDate) : null, id]
        );

        const [updatedTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
        res.json(updatedTask[0]);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
