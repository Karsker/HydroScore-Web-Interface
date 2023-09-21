import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
const HomePage = () => {


    useEffect(() => {
        document.title = 'HydroScore';
        let vid = document.getElementById("background-video");
        console.log(vid);
        vid.onended = function () {
            console.log("Hi");
            vid.currentTime = 9;
            vid.pause();
        }
    });
    return (
        <React.Fragment>
            < Navbar />
            <div className='h-screen flex flex-col gap-3 justify-center items-center relative left-0 right-0 font-poppins text-white'>
                <video id="background-video" autoPlay muted className='w-full h-full left-0 right-0 object-cover -z-10 absolute'>
                    <source src="src/videos/Landing-Page_Water-Dropping.mp4" />
                </video>
                <h1 className='text-4xl text-white z-1'>Welcome to HydroScore</h1>
                Scroll to know more
            </div>
            <div className='text-white bg-black font-poppins'>
                <div className='card flex flex-row px-5 py-5 gap-2'>
                    <div className='w-1/2'>
                        <h1 className='text-4xl'>
                            Every thing you use consumes water!
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium laboriosam laudantium nulla aliquam, perspiciatis eligendi enim similique ullam, commodi esse officia, suscipit nihil aliquid illum soluta. Laborum dolorum nostrum minima!
                        </p>
                    </div>
                    <div className='w-1/2 flex flex-col justify-center items-center'>
                        An image?
                        <Link to='/scan'>Scan</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomePage