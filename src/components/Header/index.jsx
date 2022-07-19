import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const HeaderLink = ({ to, children }) => {
    return <Link className='flex h-11 items-center px-2 py-1 rounded text-base hover:cursor-pointer hover:bg-gray-700' to={to}>{children}</Link>
}

export const Header = () => {
    const tasks = useSelector(state => state.tasks);
    const uncompletedTasks = tasks.filter(({ isCompleted, isDeleted }) => !isCompleted && !isDeleted);

    return (
        <header className='bg-transparent flex gap-1 h-16 items-center justify-between px-2 py-1 w-full'>
            <h1 className='cursor-default flex font-bold h-full items-center justify-center p-1 text-center text-xl'>Opus</h1>
            <nav className='flex gap-2 h-full items-center justify-center p-1 text-center'>
                <HeaderLink to='/tasks'>Home</HeaderLink>
                <HeaderLink to='/tasks/create'>Create task</HeaderLink>
            </nav>
            <p className='bg-gray-700 cursor-default flex h-11 items-center justify-center rounded w-11'>{uncompletedTasks.length}</p>
        </header>
    );
}