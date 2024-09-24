// src/components/TaskCard.jsx
import React from 'react';
import { MdDeleteOutline  } from "react-icons/md";
import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ task, updateTaskStatus, deleteTask }) => {
    const nextStatus = task.status === 'Pending' ? 'In Progress' : task.status === 'In Progress' ? 'Completed' : null;

    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: task._id,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).replace(',', '');
    };

    return (
        <div className="task-card" ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className="top">
                <h3>{task.title}</h3>
                <MdDeleteOutline onClick={() => deleteTask(task._id)} />
            </div>
            <p>{task.description}</p>
            {nextStatus && (
                <button onClick={() => updateTaskStatus(task._id, nextStatus)}>
                    {task.status === 'Pending' ? 'Start' : 'Complete'}
                </button>
            )}
            {task.status === 'Completed' && <p><b>Completed at: {formatDate(task.timestamp)}</b></p>}
        </div>
    );
};

export default TaskCard;
