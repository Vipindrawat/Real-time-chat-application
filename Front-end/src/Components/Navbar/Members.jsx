import React from 'react'

const Members = (props) => {
    const { name, pic, crossclick, id } = props;

    return (
        <>
            <div className=" mx-2 mt-3bg-white rounded-xl cursor-pointer mb-2 inline-block bg-green-200 mt-2" >
                <div className="flex">
                    <div className="flex-shrink-0">
                        <span className="w-7 h-7 block bg-white rounded-full dark:bg-gray-700">
                            <img className='rounded-full' src={pic} />
                        </span>
                    </div>

                    <div className="ml-2 mr-2 mt-1 w-full flex justify-between items-center ">
                        <h2 className='text-md font-sans'>{name}</h2>
                        <i className="fa-solid fa-xmark inline-block ml-2 hover:cursor-pointer" onClick={() => { crossclick(id) }} style={{ color: " #0a0a0b" }}></i>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Members
