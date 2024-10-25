import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSensor, useSensors, PointerSensor, DndContext } from '@dnd-kit/core';
import TaskSection from './TaskSection';
import TaskForm from './TaskForm';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks').then((response) => {
            setTasks(response.data);
        });
    }, []);

    const addTask = (title, description, priority, dueDate) => {
        const newTask = { title, description, priority, dueDate, status: 'Pending' };
        axios.post('http://localhost:5000/newTask', newTask).then((response) => {
            setTasks((prevTasks) => [...prevTasks, response.data]);
        });
    };

    const editTask = (id, title, description, priority, dueDate) => {
        const updatedTask = { title, description, priority, dueDate };
        axios.put(`http://localhost:5000/tasks/edit/${id}`, updatedTask).then((response) => {
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
        });
    };

    const updateTaskStatus = (id, newStatus) => {
        const task = tasks.find((task) => task.id === id);
        const updatedTask = { ...task, status: newStatus, timestamp: newStatus === 'Completed' ? new Date() : task.timestamp };
        axios.put(`http://localhost:5000/tasks/${id}`, updatedTask).then((response) => {
            setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
        });
    };

    const deleteTask = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (confirmed) {
            axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
                setTasks(tasks.filter((task) => task.id !== id));
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
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Dynamic Task Manager</h1>
            <TaskForm addTask={addTask} />
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                <div className="flex justify-center gap-10 mb-10 w-full px-5">
                    <TaskSection title="Pending" tasks={tasks.filter((task) => task.status === 'Pending')} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} editTask={editTask} />
                    <TaskSection title="In Progress" tasks={tasks.filter((task) => task.status === 'In Progress')} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} editTask={editTask} />
                    <TaskSection title="Completed" tasks={tasks.filter((task) => task.status === 'Completed')} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} editTask={editTask} />
                </div>
            </DndContext>
        </div>
    );
}

export default Dashboard