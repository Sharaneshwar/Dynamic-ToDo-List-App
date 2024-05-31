// src/components/TaskCard.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ task, updateTaskStatus }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: task._id,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    const nextStatus = task.status === 'Pending' ? 'In Progress' : task.status === 'In Progress' ? 'Completed' : null;

    return (
        <div className="task-card" ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {nextStatus && (
                <button onClick={() => updateTaskStatus(task._id, nextStatus)}>
                    {task.status === 'Pending' ? 'Start' : 'Complete'}
                </button>
            )}
            {task.status === 'Completed' && <p>Completed at: {new Date(task.timestamp).toLocaleString()}</p>}
        </div>
    );
};

export default TaskCard;
