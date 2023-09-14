import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const HomePage = () => {

    useEffect(() => {
        document.title = 'HydroScore';
    });
    return (
        <div className='font-comic-neue flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl text-blue-400'>Welcome to HydroScore</h1>
            <Link to='/scan' className="bg-black px-3 py-1 rounded-sm text-white my-3">
                Scan Now
            </Link>
        </div>
    )
}

export default HomePage