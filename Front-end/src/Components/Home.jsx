import React from 'react'
import Message from './Message/Message'
import Navbar from './Navbar/Navbar'
import Search_and_Chat from './Search_and_Chat'

const Home = () => {

    return (
        <>
            <Navbar />
            <div className='md:mt-4 xl:mt-7 mt-7 flex flex-row md:h-[85vh] min-h-[85vh] md:justify-between justify-center'>
                <Search_and_Chat />
                <Message />
            </div>
        </>
    )
}

export default Home;
