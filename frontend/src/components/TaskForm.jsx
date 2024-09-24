// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <form className="flex flex-col items-center gap-5 w-4/5 mb-10" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-1/2 p-3 rounded-lg border-2 border-indigo-200 font-semibold text-lg"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows="5"
                className="w-1/2 p-3 rounded-lg border-2 border-indigo-200 font-medium text-lg"
            />
            <button type="submit" className="px-6 py-2 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-200 hover:text-indigo-600 transition duration-300">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
