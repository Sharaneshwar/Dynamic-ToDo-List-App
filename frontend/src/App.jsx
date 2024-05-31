// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndContext } from '@dnd-kit/core';
import './App.css';
import TaskSection from './components/TaskSection';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = (title, description) => {
    const newTask = { title, description, status: 'Pending' };
    axios.post('http://localhost:5000/tasks', newTask).then((response) => {
      setTasks([...tasks, response.data]);
    });
  };

  const updateTaskStatus = (id, newStatus) => {
    const task = tasks.find((task) => task._id === id);
    const updatedTask = { ...task, status: newStatus, timestamp: newStatus === 'Completed' ? new Date() : task.timestamp };
    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask).then((response) => {
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newStatus = over.id.replace('_', ' ');
      updateTaskStatus(active.id, newStatus);
    }
  };

  return (
    <div className="App">
      <h1>Dynamic To-Do List</h1>
      <TaskForm addTask={addTask} />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="task-sections">
          <TaskSection title="Pending" tasks={tasks.filter((task) => task.status === 'Pending')} updateTaskStatus={updateTaskStatus} />
          <TaskSection title="In Progress" tasks={tasks.filter((task) => task.status === 'In Progress')} updateTaskStatus={updateTaskStatus} />
          <TaskSection title="Completed" tasks={tasks.filter((task) => task.status === 'Completed')} updateTaskStatus={updateTaskStatus} />
        </div>
      </DndContext>
    </div>
  );
};
 
export default App;
