import { createSlice } from '@reduxjs/toolkit';
import { useLocal } from '../../hooks/useLocal';

const { setItem, getItem } = useLocal();
const initialState = getItem('tasks') || [];

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { payload: task } = action;
            state.push({ ...task });
            setItem('tasks', state);
        },
        removeTask: (state, action) => {
            const { payload: id } = action;
            const tasks = state.map(task => {
                const now = new Date().getTime();
                return task.id === id
                    ? { ...task, isDeleted: true, deletedAt: now, updatedAt: now }
                    : task;
            });
            setItem('tasks', tasks);
            return tasks;
        },
        updateTask: (state, action) => {
            const { payload: updatedTask } = action;
            const now = new Date().getTime();
            const tasks = state.map(task => task.id === updatedTask.id
                ? { ...task, ...updatedTask, updatedAt: now }
                : task
            );
            setItem('tasks', state);
            return tasks;
        },
        restoreTask: (state, action) => {
            const { payload: id } = action;
            state = state.map(task => {
                const now = new Date().getTime();
                return task.id === id
                    ? { ...task, isDeleted: false, deletedAt: 0, updatedAt: now }
                    : task;
            });
            setItem('tasks', state);
        },
        clearTasks: () => {
            setItem('tasks', []);
        },
        updateTaskCompletedState: (state, action) => {
            const { payload: { id, isCompleted } } = action;
            const now = new Date().getTime();
            const tasks = state.map(task => task.id === id
                ? { ...task, isCompleted, updatedAt: now }
                : task
            );
            setItem('tasks', tasks);
            return tasks;
        },
        recoverTask: (state, action) => {
            const { payload: id } = action;
            const tasks = state.map(task => {
                const now = new Date().getTime();
                return task.id === id
                    ? { ...task, isDeleted: false, deletedAt: 0, updatedAt: now }
                    : task;
            });
            setItem('tasks', state);
            return tasks;
        },
        removePermanentlyDeletedTask : (state, action) => {
            const { payload: id } = action;
            const tasks = state.filter(task => task.id !== id);
            setItem('tasks', tasks);
            return tasks;
        },
        removePermanentlyAllDeletedTasks: (state, action) => {
            const tasks = state.filter(task => !task.isDeleted);
            setItem('tasks', tasks);
            return tasks;
        },
        recoverAllTask: (state, action) => {
            const tasks = state.map(task => {
                const now = new Date().getTime();
                return { ...task, isDeleted: false, deletedAt: 0, updatedAt: now };
            });
            setItem('tasks', tasks);
            return tasks;
        }

    }
});

export const {
    addTask,
    removeTask,
    updateTask,
    clearTasks,
    restoreTask,
    updateTaskCompletedState,
    recoverTask,
    removePermanentlyDeletedTask,
    removePermanentlyAllDeletedTasks,
    recoverAllTask
} = tasksSlice.actions;
export default tasksSlice.reducer;

