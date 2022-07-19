import React from "react";
import { Link } from "react-router-dom";
import { BiCheckbox, BiCheckboxChecked, BiEdit, BiTrash, BiCheckboxMinus } from "react-icons/bi";

const getDate = (miliseconds) => {
    const getNormailizedStamp = stamp => stamp <= 9 ? `0${stamp}` : stamp;
    const date = new Date(miliseconds);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = getNormailizedStamp(date.getHours());
    const minutes = getNormailizedStamp(date.getMinutes());
    return `${day}/${month}/${year} ${hour}:${minutes}`;
}

export const Task = ({ task, handleDelete, handleComplete, handleRecover, tasksDeleted }) => {
    const { id, title, description, isCompleted, updatedAt } = task;
    const lastUpdate = getDate(updatedAt);
    const BoxComponent = isCompleted ? BiCheckboxChecked : BiCheckbox;
    const overline = isCompleted ? "line-through text-gray-400" : "";

    return (
        <>
            <div className="flex flex-col gap-1 h-32 items-center justify-between bg-gray-600 p-2 rounded w-72">
                <div className="flex flex-col gap-1 h-full w-full">
                    <header className="flex gap-1 items-center justify-between px-1  w-full">
                        <h3 className={`font-bold ${!isCompleted ? 'hover:underline' : ''} text-base ${overline}`}>
                            <Link to={`/tasks/${id}`} className={isCompleted ? 'pointer-events-none' : ''}>
                                {title}
                            </Link>
                        </h3>
                        <small className="text-gray-300 text-xs">{lastUpdate}</small>
                    </header>
                    <p className={`px-1 text-white text-xs text-start w-full ${overline}`}>{description}</p>
                </div>
                <div className="flex gap-1 h-11 items-center justify-between w-full">
                    <div className="flex gap-1 h-full items-center justify-between">
                        <button className="flex gap-1 h-8 items-center justify-center w-8" style={{outline: 'none'}} onClick={() => handleComplete(id, isCompleted)}>
                            <BoxComponent className="h-4/5 text-white text-xl w-4/5" />
                        </button>
                        <p className="text-sm">
                            {isCompleted ? "Completed" : "Pending"}
                        </p>
                    </div>
                    <div className="flex gap-2 h-full items-center justify-between">
                        {
                            !isCompleted && !tasksDeleted &&
                                <Link className="bg-indigo-600 flex items-center justify-center outline-none p-1 rounded w-7" to={`/tasks/${id}`}>
                                    <BiEdit className="text-white text-xl" />
                                </Link>
                        }
                        {
                            !tasksDeleted
                                ? <button className="bg-red-500 flex items-center justify-center outline-none p-1 rounded w-7" onClick={() => handleDelete(id)}>
                                    <BiTrash className="text-white text-xl" />
                                </button>
                                : <button className="bg-green-500 flex items-center justify-center outline-none p-1 rounded w-7" onClick={() => handleRecover(id)}>
                                    <BiCheckboxMinus className="text-white text-xl" />
                                </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Task;