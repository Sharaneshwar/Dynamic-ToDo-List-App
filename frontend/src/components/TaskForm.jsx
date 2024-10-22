// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(title, description, priority, dueDate);
        setTitle('');
        setDescription('');
        setPriority('Low');
        setDueDate('');
    };

    const getMinDate = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Convert minutes to ms
        return new Date(now - offset).toISOString().slice(0, -8);
    };

    return (
        <form className="flex flex-col gap-2 items-center w-4/5 mb-10" onSubmit={handleSubmit}>
            <label htmlFor="title" className='text-lg w-1/2 font-semibold'>Title</label>
            <input
                name='title'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-1/2 p-2 mb-4 rounded-lg border-2 border-indigo-200 font-semibold text-md"
            />
            <label htmlFor="description" className='text-lg w-1/2 font-semibold'>Description</label>
            <textarea
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="5"
                className="w-1/2 p-2 mb-4 rounded-lg border-2 border-indigo-200 font-medium text-md"
            />
            <label htmlFor="dueDate" className='text-lg w-1/2 font-semibold'>Due Date</label>
            <input
                name='dueDate'
                type="datetime-local"
                value={dueDate}
                min={getMinDate()}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-2 py-2 mb-4 w-1/2 border-indigo-200 rounded-lg border-2 font-medium"
            />
            <label htmlFor="priority" className='text-lg w-1/2 font-semibold'>Priority</label>
            <select
                name='priority'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-2 py-[.65rem] mb-4 w-1/2 border-indigo-200 rounded-lg border-2 transition duration-300 ease-in-out font-medium bg-white"
            >
                <option value="Low" className="text-green-500">Low</option>
                <option value="Medium" className="text-yellow-500">Medium</option>
                <option value="High" className="text-red-500">High</option>
            </select>
            <button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
