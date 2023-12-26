import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import Alert from './Alert';

const Authentication = () => {
    const location = useLocation();
    return (
        <div>
            <Alert />
            <div className=" flex w-full flex-col items-center mt-4">
                <div className='bg-white rounded 2xl:w-2/6 lg:w-[46%] md:w-7/12 w-11/12 px-8 sm:py-5 py-3'>
                    <h1 className='text-center font-bold text-4xl'>Astacus</h1>
                </div>
                <div className='bg-white rounded 2xl:w-2/6 lg:w-[46%] md:w-7/12 w-11/12 px-8 mt-4 h-14 pt-2'>
                    <h1 className={`text-center sm:font-medium font-serif sm:text-3xl text-2xl  pt-1 inline-block w-2/4 h-full rounded-md ${location.pathname == "/signup" ? "bg-blue-400 text-white" : "bg-white text-black"}`}><Link to="/signup">Signup</Link></h1>
                    <h1 className={`text-center sm:font-medium font-serif sm:text-3xl text-2xl  inline-block w-2/4 h-full rounded-md pt-1 ${location.pathname == "/login" ? "bg-blue-400 text-white " : "bg-white text-black"}`}><Link to="/login">Login</Link></h1>
                </div>
            </div>
        </div>
    )
}

export default Authentication;

