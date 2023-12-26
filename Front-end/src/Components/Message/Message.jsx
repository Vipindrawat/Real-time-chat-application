import React, { useEffect } from 'react'
import Mesgnav from './Mesgnav';
import SRmssg from './SRmssg';
import socket from '../Socket';
import { allmessagestates } from '../../context/Message/Messagestates';

const Message = () => {
    const { messages, inputmessage, setinputmessage, messagesender, allmessages, setallmessages, showmessages } = allmessagestates();

    const inputchange = (e) => {
        const enter = e.target.value;
        setinputmessage(enter);
    }

    const arrowclicked = async () => {
        if (inputmessage != "") {
            socket.emit("stop typing", messages.id);
            const response = await messagesender(inputmessage, messages.id);
            socket.emit("send", response);
            //Adding new message to already existing messages:
            const newarray = [...allmessages, response];
            setallmessages(newarray);
            setinputmessage("");
        }
    }
    const keydownhandler = (e) => {
        if (e.key === 'Enter') {
            arrowclicked();
        }
    }
    useEffect(() => {
        if (inputmessage == "") {
            socket.emit("stop typing", messages.id);
        }
        else {
            socket.emit("typing", messages.id);
        }
    }, [inputmessage])

    const messagevisibility = () => {
        const messagecom = document.getElementById('messagecom');
        if (showmessages) {
            messagecom.classList.remove('hidden');
            messagecom.classList.add('flex');
        }
        else {
            messagecom.classList.remove('flex');
            messagecom.classList.add('hidden');
        }
    }
    useEffect(() => {
        messagevisibility();
    }, [showmessages])
    return (
        <div id='messagecom' className={`2xl:w-8/12 md:w-3/5 w-11/12 bg-gray-200 rounded-md 2xl:mr-14 lg:mr-5 md:mr-3  border-2 md:flex hidden justify-center items-center border-blue-400 ${messages.name == "" ? " bg-astacus bg-contain bg-no-repeat bg-center" : ""} `}>

            {messages.name != "" && <div className='md:h-[96%] w-[96%] flex flex-col items-center  rounded-md md:mb-0 mb-3'>

                <div className="md:h-[8%] h-12 bg-blue-200 w-full rounded-md ">

                    <Mesgnav name={messages.name} pic={messages.pic} id={messages.id} />
                </div>

                <div className=" w-full h-[82%] min-h-[75vh] rounded-md bg-blue-300 flex flex-col justify-end " >

                    <div className="md:overflow-y-scroll flex flex-col-reverse">
                        <div className="flex flex-col">
                            <SRmssg id={messages.id} />
                        </div>
                    </div>

                </div>

                <div className='flex items-center w-full md:h-[10%] h-16 flex-col bg-blue-200'>
                    <input className='sm:w-5/6 w-11/12 sm:p-3 p-2.5 pl-4 pr-14 rounded-md focus:outline-none' type="text" name='search' id='search' placeholder='Enter message to send' onChange={inputchange} value={inputmessage} onKeyDown={keydownhandler} />
                    <i className="fa-solid fa-arrow-right-long relative 2xl:-right-[24rem] xl:-right-[17rem] lg:-right-[13rem] md:-right-[9rem] sm:-right-[13rem] -right-[8rem] lg:bottom-9 bottom-8 lg:text-2xl text-xl hover:cursor-pointer" style={{ color: "#1c1e22" }} onClick={arrowclicked}></i>
                </div>

            </div>}
        </div >
    )
}

export default Message;
