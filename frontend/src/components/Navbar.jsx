import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='left-0 right-0 h-[50px] bg-slate-900 text-white z-10 flex items-center gap-6 text-md ustify-start px-5'>
        <p className='text-blue-300 italic font-bold'>HYDROSCORE</p>
        <a href='/'>
            Home
        </a>
        <a href='/scan'>
            Scan
        </a>
        <a href='/about'>
            About
        </a>
    </div>
  )
}

export default Navbar