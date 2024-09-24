// src/components/TaskSection.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const TaskSection = ({ title, tasks = [], updateTaskStatus, deleteTask }) => {
    const { setNodeRef } = useDroppable({
        id: title,
    });

    return (
        <div ref={setNodeRef} className="bg-white p-6 rounded-xl shadow-md w-1/3 flex flex-col items-center hover:shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
            {tasks.map((task, index) => (
                <TaskCard key={task._id} task={task} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
            ))}
        </div>
    );
};

export default TaskSection;
