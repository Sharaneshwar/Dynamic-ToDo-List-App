// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSensor, useSensors, PointerSensor, DndContext } from '@dnd-kit/core';
import TaskSection from './components/TaskSection';
import TaskForm from './components/TaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/tasks').then((response) => {
            setTasks(response.data);
        });
    }, []);

    const addTask = (title, description) => {
        const newTask = { title, description, status: 'Pending' };
        axios.post('http://localhost:5000/newTask', newTask).then((response) => {
            setTasks((prevTasks) => [...prevTasks, response.data]);
        });
    };

    const updateTaskStatus = (id, newStatus) => {
        const task = tasks.find((task) => task._id === id);
        const updatedTask = { ...task, status: newStatus, timestamp: newStatus === 'Completed' ? new Date() : task.timestamp };
        axios.put(`http://localhost:5000/tasks/${id}`, updatedTask).then((response) => {
            setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
        });
    };

    const deleteTask = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
                setTasks(tasks.filter((task) => task._id !== id));
            });
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const newStatus = over.id;
            updateTaskStatus(active.id, newStatus);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    return (
        <div className="min-h-screen bg-indigo-50 flex flex-col items-center py-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Dynamic To-Do List</h1>
            <h2 className="text-lg font-medium text-gray-600 mb-10">By Sharaneshwar Punjal</h2>
            <TaskForm addTask={addTask} />
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                <div className="flex justify-center gap-10 mb-10 w-full px-5">
                    <TaskSection title="Pending" tasks={tasks.filter((task) => task.status === 'Pending')} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
                    <TaskSection title="In Progress" tasks={tasks.filter((task) => task.status === 'In Progress')} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
                    <TaskSection title="Completed" tasks={tasks.filter((task) => task.status === 'Completed')} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
                </div>
            </DndContext>
        </div>
    );
};

export default App;
