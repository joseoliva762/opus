import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header';

import { BiTrash } from 'react-icons/bi';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const handleTrash = () => {
        navigate('/tasks/deleted');
    }

    return (
        <>
            <Header />
            <div className='w-full'>{children}</div>
            <button onClick={handleTrash} className='bg-red-500 bottom-3 fixed flex items-center justify-center rounded h-8 right-3 w-8'>
                <BiTrash className='text-gray-300 text-xl'/>
            </button>
        </>
    );
}
export default Layout;