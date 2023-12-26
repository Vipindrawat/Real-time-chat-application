import React from 'react'
import { allchatstates } from '../../context/chats/Chatstates';
import { allmessagestates } from '../../context/Message/Messagestates';

const Gsearchitem = (props) => {
    const { sname, semail, spic, sid } = props;
    const { capitalize } = allmessagestates();

    const { memberselect, setmemberno } = allchatstates();

    const gsearchclick = () => {
        const alreadyexixts = memberselect.filter((value) => {
            return value._id == sid;
        })

        if (alreadyexixts.length == 0) {
            memberselect.push({ _id: sid, name: sname, email: semail, pic: spic });
            setmemberno(memberselect.length);
        }
    }

    return (
        <div >
            <hr />
            <div onClick={gsearchclick} className="flex mx-2 mt-3  bg-white rounded hover:cursor-pointer hover:bg-blue-200 mb-2">
                <div className="flex-shrink-0 ml-2">
                    <span className="w-11 h-11 block bg-white rounded-full dark:bg-gray-700">
                        <img className='rounded-full' src={spic} />
                    </span>
                </div>

                <div className="ml-5 md:ml-3 xl:ml-5 mt-1 w-full flex justify-between items-center ">
                    <div className="h-14  rounded-md dark:bg-gray-700 flex flex-col " >
                        <h2 className='text-lg md:text-sm lg:text-base xl:text-lg font-medium'>{capitalize(sname)}</h2>
                        <div className=' lg:inline-block lg:text-sm md:text-xs'>
                            <h3 className='inline-block '>Email :</h3>  {semail.length == 15 ? semail + "..." : semail}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Gsearchitem
