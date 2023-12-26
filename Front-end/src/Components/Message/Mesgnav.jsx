import React, { useRef } from 'react'
import Modalcom from '../Modal';
import Drawer from '../Navbar/Drawer';
import { allmessagestates } from '../../context/Message/Messagestates';
import { alluserstates } from '../../context/user/UserStates';
import { allchatstates } from '../../context/chats/Chatstates';

const Mesgnav = (props) => {
    const { name, pic } = props;
    const editref = useRef(null);

    const { messages, capitalize, setshowmessages } = allmessagestates();

    const { setonesearch } = alluserstates();

    const { setmemberselect, setgroupname, setedit } = allchatstates();

    const targetComponentRef = useRef(null);

    const picClick = () => {
        setonesearch({ name: messages.name, pic: pic })
        if (targetComponentRef.current) {
            targetComponentRef.current.clickButton();
        }
    }

    const editclick = () => {
        if (editref.current) {
            editref.current.Drawerclick();
        }
        setmemberselect(messages.users);
        setgroupname(messages.name);
        setedit(true);
    }
    const spanclick = () => {
        setshowmessages(false);
    }

    return (
        <>
            <div className={`flex flex-row items-center md:ml-4 ml-2 h-full ${messages.groupchat ? "justify-around" : ""}`}>
                <div className='flex flex-row items-center'>
                    <span onClick={spanclick} className="md:hidden text-4xl font-extrabold mr-2">

                        <svg className="w-5 mr-2 text-2xl" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"></path>
                        </svg>
                    </span>
                    <span className="w-10 h-10 block bg-white rounded-full">
                        <img src={pic} onClick={picClick} />
                    </span>
                    <h1 className='text-xl font-semibold text-black ml-3'>{capitalize(name)}</h1>
                </div>
                {messages.groupchat && <div className="flex flex-row space-x-5">
                    <i onClick={editclick} className="fa-solid fa-pen-to-square text-2xl hover:cursor-pointer" style={{ color: " #151619" }}></i>
                </div>}

            </div>

            <Modalcom ref={targetComponentRef} />
            <Drawer ref={editref} />
        </>
    )
}

export default Mesgnav;
