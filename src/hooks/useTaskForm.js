import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { addTask, updateTask } from "../features/tasksSlice";

export const useTaskForm = (initialFormState) => {
    const [ task, setTask ] = useState({ ...initialFormState });
    const dispatch = useDispatch();

    const handleChange = ({ target }) => setTask({
        ...task,
        [target.name]: target.value
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, description } = task;
        if (!title || !description) return;
        const isNewTask = !task?.id;
        const id = isNewTask ? uuidV4() : task.id;
        const now = new Date().getTime();

        const submitedTask = {
            ...task,
            id,
            updatedAt: now,
            createdAt: isNewTask ? now : task.createdAt
        };
        const action = isNewTask ? addTask : updateTask;
        dispatch(action(submitedTask));
        setTask({ ...submitedTask });
        return true;
    }

    return {
        task,
        setTask,
        handleChange,
        handleSubmit
    }
}