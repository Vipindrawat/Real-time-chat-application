import React, {  useEffect, useRef, useState } from 'react'
import Drawer from './Drawer';
import Modal from '../Modal'
import { allalertstates } from '../../context/alert/Alertstates';
import { alluserstates } from '../../context/user/UserStates';
import { allchatstates } from '../../context/chats/Chatstates';

const Navbar = () => {
  const [count, setcount] = useState(0);
  const { notification } = allalertstates();

  const { getmyinfo, setonesearch, mydata } = alluserstates();

  const { setgroupname, setmemberselect } = allchatstates();

  const groupref = useRef();
  const myinfo = useRef(null);

  useEffect(() => {
    getmyinfo();
  }, [])

  const imageclick = (e) => {
    e.preventDefault();
    setonesearch({ name: mydata.userdata.name, pic: mydata.userdata.pic });
    if (myinfo.current) {
      myinfo.current.clickButton();
    }
  }

  const groupclick = () => {
    setgroupname("");
    setmemberselect([]);
    groupref.current.Drawerclick();
  }

  useEffect(() => {

    let vari = 0;
    notification.forEach(() => {
      vari = count;
      vari++;
    })
    setcount(vari);
  }, [notification.length])

  return (
    <>
      <div className="h-14 w-full bg-green-700 flex justify-center items-center">

        <div className="h-12 w-[97%] bg-white rounded-md flex justify-evenly items-center">

          <div className="sm:space-x-5 space-x-3 flex flex-row items-center ">

            <i className="fa-solid fa-people-group sm:text-2xl text-xl hover:cursor-pointer" style={{ color: " #161618" }} onClick={groupclick}></i>
            <i className="fa-solid fa-envelope  sm:text-3xl text-xl hover:cursor-pointer relative" style={{ color: " #161718" }}>
              <span className={`${count != 0 ? "absolute" : "hidden"}  flex h-5 w-5 bottom-5 right-0`}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 "></span>
                <span className=" inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-sm text-right">
                  <span className="pl-2">{count}</span>
                </span>
              </span>
            </i>



            <div className="flex-shrink-0 ml-2">
              <span className="sm:w-11 sm:h-11 w-8 h-8 block bg-white rounded-full dark:bg-gray-700">
                <img onClick={imageclick} src={`${!mydata ? "https://img.freepik.com/free-icon/user_318-180888.jpg" : mydata.userdata.pic}`} />
              </span>
            </div>

          </div>

          <h2 className=' lg:text-5xl sm:text-4xl text-3xl font-sans text-blue-700'>astacus</h2>
        </div>
      </div>

      <Drawer ref={groupref} />
      <Modal ref={myinfo} />
    </>
  )
}

export default Navbar;
