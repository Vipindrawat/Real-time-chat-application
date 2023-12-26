import React from 'react'
import { allchatstates } from '../../context/chats/Chatstates';
import { allmessagestates } from '../../context/Message/Messagestates';

const SuggItem = (props) => {
    const { capitalize } = allmessagestates();
    const { memberselect, setmemberno } = allchatstates();

    const { name, pic, id, email } = props;
    const suggitemclick = () => {

        const alreadyexixts = memberselect.filter((value) => {
            return value._id == id;
        })
        if (alreadyexixts.length == 0) {
            memberselect.push({ _id: id, name, email, pic });
            setmemberno(memberselect.length);
        }
    }

    return (
        <div>
            <hr />
            <div className="flex mx-2 mt-3  bg-white rounded hover:bg-blue-200 cursor-pointer mb-2" onClick={suggitemclick} >
                <div className="flex-shrink-0 ml-2">
                    <span className="w-11 h-11 block bg-white rounded-full dark:bg-gray-700">
                        <img className='rounded-full' src={`${pic ? pic : "https://img.freepik.com/free-icon/user_318-180888.jpg"}`} />
                    </span>
                </div>

                <div className="ml-7 md:ml-3 xl:ml-5 mt-1 w-full flex justify-between items-center ">
                    <div className="h-14  rounded-md dark:bg-gray-700 flex flex-col " >
                        <h2 className='text-lg md:text-sm lg:text-base xl:text-lg font-medium'>{capitalize(name)}</h2>
                    </div>
                    <p className='mr-4 md:text-xs xl:text- text-sm'>
                        <i className="fa-solid fa-plus text-xl" style={{ color: "#0a0a0b" }}></i>
                    </p>
                </div>
            </div >
        </div>
    )
}

export default SuggItem
