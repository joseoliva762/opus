import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTaskForm } from "../../hooks/useTaskForm";


const initialTask = {
    id: '',
    title: '',
    description: '',
    isCompleted: false,
    priority: 0,
    createdAt: 0,
    updatedAt: 0,
    completedAt: 0,
    isDeleted: false,
    deletedAt: 0
};

export const TaskForm = () => {
    const { task, handleChange, handleSubmit, setTask } = useTaskForm(initialTask);
    const navigate = useNavigate();
    const paramas = useParams();
    const isCreatedForm = paramas.taskId === 'create';
    const tasks = useSelector(state => state.tasks);

    const handleSubmitTaskForm = (event) => {
        const submitted = handleSubmit(event);
        submitted && navigate("/tasks");
    };

    useEffect(() => {
        setTask(initialTask);
        if (paramas?.taskId && paramas.taskId !== 'create') {
            const task = tasks.find(task => task.id === paramas.taskId);
            task && setTask(task);
        }
    }, [paramas]);

    if (task?.isCompleted) return <Navigate to="/tasks" />;
    return (
        <div className="flex flex-col items-center justify-start w-full">
            <form onSubmit={handleSubmitTaskForm} className='flex flex-col gap-2 items-center justify-between bg-gray-600 p-2 rounded w-72'>
                <h1 className="font-bold text-xl">Create a new Task</h1>
                <input
                    className="bg-gray-800 h-12 text-white p-2 rounded w-full"
                    name="title"
                    type="text"
                    placeholder="title"
                    onChange={handleChange}
                    value={task?.title}
                />
                <textarea
                    className="bg-gray-800 h-20 text-white p-2 resize-none rounded w-full"
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                    value={task?.description}
                />
                <button type="submit" className="bg-indigo-600 font-bold h-12 rounded w-full">
                    { isCreatedForm ? 'Create' : 'Guardar' }
                </button>
            </form>
        </div>
    );
}
export default TaskForm;