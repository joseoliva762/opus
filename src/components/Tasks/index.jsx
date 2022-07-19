import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Task } from "../Task";
import { removeTask, updateTaskCompletedState, recoverTask, removePermanentlyAllDeletedTasks, recoverAllTask } from "../../features/tasksSlice";
import { BiTrash, BiCheckboxMinus } from "react-icons/bi";


export const Tasks = ({ tasksDeleted }) => {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(removeTask(id));
    };

    const handleComplete = (id, isCompleted) => {
        dispatch(updateTaskCompletedState({id, isCompleted: !isCompleted}));
    }

    const handleRecover = (id) => {
        dispatch(recoverTask(id));
    }

    const handleDeleteAll = () => {
        dispatch(removePermanentlyAllDeletedTasks());
    }

    const handleRecoverAll = () => {
        dispatch(recoverAllTask());
    }

    return tasks.length
        ? <>
            {
                tasksDeleted && <>
                    <section className='flex flex-wrap gap-2 items-center justify-center p-2 w-full'>
                        <button onClick={handleRecoverAll} className='bg-indigo-500 flex gap-2 h-11 items-center justify-between px-4 py-1 rounded'>
                            <BiCheckboxMinus className='text-white text-xl' />
                            <p>Recover all</p>
                        </button>
                        <button onClick={handleDeleteAll} className='bg-red-500 flex gap-2 h-11 items-center justify-between px-4 py-1 rounded'>
                            <BiTrash className='text-white text-xl' />
                            <p>Remove all permanently</p>
                        </button>
                    </section>
                </>
            }
            <div className='gap-2 grid grid-cols-fill-72 p-2 place-content-center w-full'>
                {
                    tasks.map(task => {
                        const shouldShow = tasksDeleted ? task.isDeleted : !task.isDeleted;
                        return shouldShow && <Task
                            key={'task-' + task.id}
                            task={task}
                            handleDelete={handleDelete}
                            handleComplete={handleComplete}
                            handleRecover={handleRecover}
                            tasksDeleted={tasksDeleted}
                        />
                    })
                }
            </div>
        </>
        : <p>No tasks available</p>;
}

export default Tasks;