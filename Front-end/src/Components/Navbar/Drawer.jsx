import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { allchatstates } from '../../context/chats/Chatstates';
import { allmessagestates } from '../../context/Message/Messagestates';
import { alluserstates } from '../../context/user/UserStates';
import Gsearch from './Gsearch';
import Members from './Members';
import Suggestion from './Suggestion';

const Drawer = forwardRef((props, ref) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerref = useRef();

    const { messages } = allmessagestates();

    const { memberselect, groupname, setgroupname, creatinggroup, setmemberselect, edit, groupediting, memberno } = allchatstates();

    const { gsearch, setgsearch, searchinguser } = alluserstates();

    useImperativeHandle(ref, () => ({
        Drawerclick: () => {
            drawerref.current.click();
        }
    }))
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const backarrow = () => {
        drawerref.current.click();
    }
    // handling onchange:
    const namesetup = (e) => {
        setgroupname(e.target.value);
    }
    // handling onclick:1-not edit
    const createclick = (e) => {
        e.preventDefault();
        let users = [];
        creatinggroup.forEach(element => {
            users.push(element.id);
        });
        creatinggroup(users, groupname);
        drawerref.current.click();
        setmemberselect([]);
        setgroupname("");
    }
    // handling onlclick :2 -edit
    const createclickedit = (e) => {
        e.preventDefault();
        groupediting(memberselect, groupname, messages.id);
        drawerref.current.click();
        setmemberselect([]);
        setgroupname("");
    }

    const crossclick = (id) => {
        let newgroup = memberselect.filter((value) => {
            return value.id != id;
        })
        setmemberselect(newgroup);
    }
    let timer;

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            searchinguser(gsearch);
        }, 1000);
    }, [gsearch])

    const gsearchchange = (e) => {
        setgsearch(e.target.value);
    }


    return (
        <div className="flex">
            <input
                type="checkbox"
                id="drawer-toggle"
                className="relative sr-only peer "
                checked={isDrawerOpen}
                onChange={toggleDrawer}
            />
            <label
                htmlFor="drawer-toggle" ref={drawerref}
                className=" absolute top-0 left-0 hidden p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64"
            >
                <div className="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
                <div className="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
            </label>
            <div
                className={`fixed top-0 left-0 z-20 2xl:w-1/4 md:w-5/12 lg:w-2/5 xl:w-[38%] w-[96%] h-full transition-all duration-500 transform ${isDrawerOpen ? '' : '-translate-x-full'
                    } bg-white shadow-lg`}
            >
                <div className="px-6 py-4 h-[10%] bg-green-800 text-white flex flex-row justify-start items-end">
                    <i onClick={backarrow} className="fa-solid fa-arrow-left text-xl mr-5 hover:cursor-pointer" style={{ color: "#fof2f4" }}></i>
                    <h2 className="text-xl font-semibold">
                        Add group participants
                    </h2>
                </div>
                <div className=" h-[90%] w-full color bg-gray-200 flex flex-col items-center justify-center">

                    <div className="w-11/12 h-[75%]  bg-white rounded-md overflow-y-auto">

                        <div className="w-full sticky top-0 bg-gray-50">
                            {memberno != 0 && memberselect.map((value, index) => {
                                return <Members name={value.name} pic={value.pic} key={index} id={value.id} crossclick={crossclick} />
                            })}

                            <div className="w-full ">
                                <input onChange={gsearchchange} value={gsearch} className='w-11/12 p-2 px-4 ml-4 py-4 my-5  focus:outline-none border-b border-black' type="text" name='credential' id='search' placeholder='Search to add users' required />
                            </div>
                        </div>

                        <div>
                            {gsearch == "" && <div >
                                <h1 className="text-center text-xl mb-2 text-green-700 font-semibold">Suggestions:</h1>
                                <Suggestion />
                            </div>}
                            {gsearch != "" && <Gsearch />}
                        </div>

                    </div>

                    {memberselect.length > 1 && <form className='bg-gray-400 w-11/12 h-[22%] flex flex-col text-black items-center justify-center ' onSubmit={edit ? createclickedit : createclick}>

                        <label className='text-xl lg:font-semibold font-medium' htmlFor="groupname">GroupName :<br />
                            <input onChange={namesetup} className='lg:w-80 md:w-56 sm:w-80 w-56 lg:p-2 md:p-1.5 sm:p-2 p-1.5 px-4 rounded-md focus:outline-none text-black text-base font-normal mt-2 ' required type="text" name='groupname' id='groupname' value={groupname} />
                        </label>

                        {!edit && <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold lg:py-3 md:py-2 sm:py-3 py-2 lg:px-4 px-2 rounded sm:mt-4 mt-2 lg:w-72 md:w-48 sm:w-72 w-48 mb-2">
                            Create Group
                        </button>}
                        {edit && <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold lg:py-3 py-2 lg:px-4 px-2 rounded sm:mt-4 mt-2 lg:w-72 md:w-48 sm:w-72 w-48 mb-2">
                            Save changes
                        </button>}
                    </form>
                    }
                </div>
            </div>
        </div>
    );
})

export default Drawer;
