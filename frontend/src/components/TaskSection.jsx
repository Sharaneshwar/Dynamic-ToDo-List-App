// src/components/TaskSection.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const TaskSection = ({ title, tasks = [], updateTaskStatus, deleteTask }) => {
    const { setNodeRef } = useDroppable({
        id: title,
    });

    return (
        <div className="task-section" ref={setNodeRef}>
            <h2>{title}</h2>
            {tasks.map((task, index) => (
                <TaskCard key={task._id} task={task} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
            ))}
        </div>
    );
};

export default TaskSection;
