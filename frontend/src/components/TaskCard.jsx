// src/components/TaskCard.jsx
import React, { useState } from 'react';
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ task, updateTaskStatus, deleteTask, editTask }) => {
    const { id, title, description, priority, dueDate, status, timestamp } = task;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedPriority, setEditedPriority] = useState(priority);
    const [editedDueDate, setEditedDueDate] = useState(dueDate);

    const nextStatus = status === 'Pending' ? 'In Progress' : status === 'In Progress' ? 'Completed' : null;

    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: id,
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

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editTask(id, editedTitle, editedDescription, editedPriority, editedDueDate);
        setIsEditing(false);
    };

    const getMinDate = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Convert minutes to ms
        return new Date(now - offset).toISOString().slice(0, -8);
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="bg-indigo-50 p-4 rounded-lg w-full mb-4 hover:bg-indigo-100 transition duration-300">
            <div className='flex justify-between items-center mb-2'>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <div className="flex space-x-2">
                    <MdEdit onClick={() => setIsEditing(!isEditing)} className="text-lg cursor-pointer" />
                    <MdDeleteOutline onClick={() => deleteTask(task.id)} className="text-lg cursor-pointer" />
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full p-2 mb-2 font-medium rounded-lg border-2 border-indigo-200"
                        required
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        rows="3"
                        className="w-full p-2 mb-2 font-medium rounded-lg border-2 border-indigo-200"
                    />
                    <select
                        value={editedPriority}
                        onChange={(e) => setEditedPriority(e.target.value)}
                        className="mb-2 p-2 font-medium rounded-lg border-2 border-indigo-200"
                    >
                        <option value="Low" className="text-green-500">Low</option>
                        <option value="Medium" className="text-yellow-500">Medium</option>
                        <option value="High" className="text-red-500">High</option>
                    </select>
                    <input
                        type="datetime-local"
                        value={editedDueDate}
                        min={getMinDate()}
                        onChange={(e) => setEditedDueDate(e.target.value)}
                        className="p-2 mb-2 font-medium rounded-lg border-2 border-indigo-200"
                    />
                    <button type="submit" className="px-4 py-1 bg-indigo-600 text-white font-semibold rounded-lg">Save</button>
                </form>
            ) : (
                <>
                    <p className="text-gray-600 mb-2">{description}</p>
                    <p className={`text-sm font-semibold mb-1 ${priority === 'Low' ? 'text-green-500' :
                        priority === 'Medium' ? 'text-yellow-500' :
                            priority === 'High' ? 'text-red-500' : 'text-gray-600'
                        }`}>{priority}</p>
                    {dueDate && <p className="text-sm font-semibold mb-3 text-gray-600">Due {formatDate(dueDate)}</p>}
                    {nextStatus && (
                        <button onClick={() => updateTaskStatus(id, nextStatus)} className="px-4 py-1 bg-indigo-600 text-white font-semibold rounded-lg">
                            {task.status === 'Pending' ? 'Start' : 'Complete'}
                        </button>
                    )}
                    {task.status === 'Completed' && <p className="text-gray-600 mt-2"><b>Completed at: {formatDate(timestamp)}</b></p>}
                </>
            )}
        </div>
    );
};

export default TaskCard;
