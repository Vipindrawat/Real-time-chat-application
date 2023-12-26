import React, { useEffect, useState } from 'react'
import { allmessagestates } from '../../context/Message/Messagestates';
import socket from '../Socket';

const Chatcomponent = (props) => {

    const [temstate, settemstate] = useState(false);
    const { setmessages, setshowmessages } = allmessagestates();

    const { name, sender, message, date, pic, id, groupchat, users } = props;

    const capitalize = (name) => {
        const small = name.toLowerCase();
        return small.charAt(0).toUpperCase() + small.slice(1);
    }
    // Using this so that whenever group is edited it can reflect changes simentaneously in message component:
    useEffect(() => {
        if (temstate) {
            onclickhandler();
        }
    }, [name]);

    const onclickhandler = () => {
        settemstate(true);
        setmessages({ name, pic, id, groupchat, users });
        socket.emit("join room", id);
        setshowmessages(true);
    }
    useEffect(() => {
        socket.emit("setup", id);
    }, [])

    return (
        <>
            <div className="flex  mx-2 mt-3  bg-gray-200 rounded  hover:bg-blue-200 cursor-pointer mb-2" onClick={onclickhandler}>
                <div className="flex-shrink-0 ml-2">
                    <span className="w-11 h-11 block bg-white rounded-full dark:bg-gray-700">
                        <img className='rounded-full' src={`${pic ? pic : "https://img.freepik.com/free-icon/user_318-180888.jpg"}`} />
                    </span>
                </div>

                <div className="ml-4 md:ml-3 xl:ml-5 mt-1 w-full flex justify-between items-center ">
                    <div className="h-14  rounded-md dark:bg-gray-700 flex flex-col " >
                        <h2 className='text-base sm:text-lg md:text-sm lg:text-base xl:text-lg font-medium'>{capitalize(name)}</h2>
                        <div className='md:hidden lg:inline-block lg:text-sm sm:text-sm text-xs '>
                            <h3 className='inline-block '>{sender} {sender == "" ? "" : ":"}</h3>  {message.length == 13 ? message + "..." : message}
                        </div>
                    </div>
                    <p className='mr-4 text-xs'>
                        {date}
                    </p>
                </div>
            </div >
        </>
    )
}

export default Chatcomponent;
