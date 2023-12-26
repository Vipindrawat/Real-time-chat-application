import React, { useState, useRef, useEffect } from 'react'
import { allmessagestates } from '../context/Message/Messagestates';
import { alluserstates } from '../context/user/UserStates';
import Chats from './Chat/Chats';
import Search from './Chat/Search';

const Search_and_Chat = () => {
    // Is used for targeting an element:
    const inputref = useRef(null);
    const [inputclick, setinputclick] = useState(false);
    const { search, setsearch, searchinguser } = alluserstates();

    const { showmessages } = allmessagestates();

    // Using the concept of debouncing:
    let timerid;

    // onchange handler:
    const searchange = (e) => {
        let newinput = e.target.value;
        // debouncing(newinput);
        setsearch(newinput);
    }
    // when input area is clicked:
    const onclick = () => {
        setinputclick(true);
    }
    // when back button is clicked:
    const arrowclick = () => {
        setinputclick(false);
        setsearch("");
    }
    // when search button is clicked:
    const searchbutton = () => {
        setinputclick(true);
        inputref.current.focus();
    }

    useEffect(() => {
        clearTimeout(timerid);
        timerid = setTimeout(() => {
            searchinguser(search);
        }, 2000);
    }, [search])

    const chatvisibility = () => {
        const chat = document.getElementById('chat');
        if (!showmessages) {
            chat.classList.remove('hidden');
            chat.classList.add('flex');
        }
        else {
            chat.classList.remove('flex');
            chat.classList.add('hidden');
        }
    }

    useEffect(() => {
        chatvisibility();
    }, [showmessages]);

    return (
        <div id='chat' className='bg-gray-200 2xl:w-1/4 md:w-5/12 lg:w-2/5 xl:w-[36%] w-[96%] 2xl:ml-14 lg:ml-5  rounded-md md:flex flex flex-col items-center border-2 border-blue-400 '>

            <div className='mt-2 w-11/12 xl:w-[95%] 2xl:w-11/12'>

                <i className={` fa-solid fa-magnifying-glass relative ${inputclick ? " bottom-52" : "top-8 left-4"} `} onClick={searchbutton} style={{ color: "#101113" }}></i>
                <i className={`fa-solid fa-arrow-left relative text-xl ${inputclick ? "top-8 " : "bottom-52"} `} onClick={arrowclick} style={{ color: " #0b0c0e" }}></i>

                <input ref={inputref} onChange={searchange} onClick={onclick} className='w-full p-2 pl-12 rounded-md focus:outline-none' type="text" value={search} name='credential' id='search' placeholder='search or start new chat' />

            </div>

            <div className="chatarea h-[90%] w-11/12 xl:w-[95%] 2xl:w-11/12 mt-3 rounded-md bg-white md:overflow-auto mb-3">
                {!search && <Chats />}
                {search && <Search />}
            </div>
        </div>
    )
}

export default Search_and_Chat;
