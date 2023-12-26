import React, { useRef } from 'react'
import { allchatstates } from '../../context/chats/Chatstates';
import { alluserstates } from '../../context/user/UserStates';
import Modalcom from '../Modal';

const Searchitem = (props) => {
    const { setsearch, setonesearch } = alluserstates();

    const { creatingchat } = allchatstates();

    const sref = useRef(null);

    const { sname, semail, spic, sid } = props;
    const capitalize = (name) => {
        const small = name.toLowerCase();
        return small.charAt(0).toUpperCase() + small.slice(1);
    }

    const imageclick = () => {
        setonesearch({ name: sname, pic: spic });
        if (sref.current) {
            sref.current.clickButton();
        }

    }
    const contentclick = () => {
        setsearch("");
        creatingchat(sid);
    }
    return (
        <>
            <div className="flex mx-2 mt-3  bg-gray-200 rounded hover:cursor-pointer hover:bg-blue-200 mb-2">
                <div className="flex-shrink-0 ml-2">
                    <span onClick={imageclick} className="w-11 h-11 block bg-white rounded-full dark:bg-gray-700">
                        <img className='rounded-full' src={`${spic ? spic : "https://img.freepik.com/free-icon/user_318-180888.jpg"}`} />
                    </span>
                </div>

                <div onClick={contentclick} className="ml-5 md:ml-3 xl:ml-5 mt-1 w-full flex justify-between items-center ">
                    <div className="h-14  rounded-md dark:bg-gray-700 flex flex-col " >
                        <h2 className='text-lg md:text-sm lg:text-base xl:text-lg font-medium'>{capitalize(sname)}</h2>
                        <div className=' lg:inline-block lg:text-sm md:text-xs'>
                            <h3 className='inline-block '>email :</h3>  {semail.length == 15 ? semail + "..." : semail}
                        </div>
                    </div>
                </div>
            </div >

            <Modalcom ref={sref} />

        </>
    )
}

export default Searchitem;
