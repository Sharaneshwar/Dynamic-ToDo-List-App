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
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="bg-indigo-50 p-4 rounded-lg w-full mb-4 hover:bg-indigo-100 transition duration-300">
            <div className='flex justify-between items-center mb-2'>
                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                <MdDeleteOutline onClick={() => deleteTask(task._id)} className='text-lg'/>
            </div>
            <p className="text-gray-600 mb-4">{task.description}</p>
            {nextStatus && (
                <button onClick={() => updateTaskStatus(task._id, nextStatus)} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full border hover:bg-indigo-200 hover:text-indigo-600 transition duration-300">
                    {task.status === 'Pending' ? 'Start' : 'Complete'}
                </button>
            )}
            {task.status === 'Completed' && <p className="text-gray-600 mt-2"><b>Completed at: {formatDate(task.timestamp)}</b></p>}
        </div>
    );
};

export default TaskCard;
