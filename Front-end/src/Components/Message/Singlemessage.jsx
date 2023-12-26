import React from 'react'
import { alluserstates } from '../../context/user/UserStates';


const Singlemessage = (props) => {
    const { message, date, id, midtime } = props;
    const { mydata } = alluserstates();

    const togettime = () => {
        const dateTime = new Date(date);

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        // Construct the formatted time
        const Time = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        return Time;
    }
    const compare = () => {
        if (id == mydata.userdata._id) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div className='text-black text-base font-sans my-2 w-full'>

            {midtime && <div className="text-center clear-both ">
                <div className="inline-block bg-gr px-2 py-2 rounded text-sm">{midtime}</div>
            </div>}

            {!compare() && <div className=" float-left clear-both bg-white xl:ml-4 md:ml-3 ml-2 rounded my-2 flex flex-row"> <div className="inline-block px-2 pt-1 pb-2  2xl:max-w-lg xl:max-w-md lg:max-w-xs md:max-w-[15rem] sm:max-w-xs max-w-[11rem] break-words">{message}</div>
                <div className="mb-0 text-xs pr-2 flex items-end">
                    <div className="inline-block relative ">{togettime()}</div>
                </div>
            </div>}

            {compare() && <div className="float-right clear-both xl:mr-4 md:mr-3 mr-2 rounded bg-green-300 my-2 flex flex-row">
                <div className="inline-block px-2 pt-1 pb-2 xl:mr-2 2xl:max-w-lg xl:max-w-md lg:max-w-xs md:max-w-[15rem] sm:max-w-xs max-w-[11rem] break-words">{message}</div>
                <div className="mb-0 text-xs pr-2 flex items-end">
                    <div className="inline-block relative ">{togettime()}</div>
                </div>
            </div>}

        </div>
    )
}

export default Singlemessage;
