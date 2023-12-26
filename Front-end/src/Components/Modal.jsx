import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";
import { allmessagestates } from '../context/Message/Messagestates';
import { alluserstates } from '../context/user/UserStates';

const Modalcom = forwardRef((props, ref) => {
    initTE({ Modal, Ripple });
    const cref = useRef(null);

    useImperativeHandle(ref, () => ({
        clickButton: () => {
            cref.current.click();
        },
    }));

    const { onesearch } = alluserstates();
    const { capitalize } = allmessagestates();
    return (
        <>
            <button
                type="button" ref={cref}
                className=" rounded-md bg-primary px-6 hidden pb-2 pt-2.5 text-xs text-black font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-toggle="modal"
                data-te-target="#exampleModal"
                data-te-ripple-init
                data-te-ripple-color="light">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div
                data-te-modal-init
                className="backdrop-blur-sm fixed left-0 sm:top-14 top-14 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div
                    data-te-modal-dialog-ref
                    className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out mx-auto mt-7 min-[640px]:max-w-[500px]  max-[639px]:max-w-[320px] ">
                    <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">

                        <div
                            className="bb-white flex sm:flex-shrink-0 items-center justify-between rounded-t-md sm:border-b-2 sm:border-neutral-100 border-opacity-100 sm:p-4 p-2 dark:border-opacity-50">
                            {/* <!--Modal title--> */}
                            <h5
                                className=" text-2xl  font-serif leading-normal text-blue-800 mt-8"
                                id="exampleModalLabel">
                            </h5>
                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="text-white box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                data-te-modal-dismiss
                                aria-label="Close">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="black"
                                    className="h-8 w-8 mt-3">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* <!--Modal body--> */}
                        <div className="sm:relative sm:flex-auto p-4 bg-gradient-to-r from-green-400" data-te-modal-body-ref>


                            <div className='flex justify-center flex-col items-center'>
                                <div className="flex-shrink-0 ml-2 bg-gradient-to-l from-gray-300 to-gray-100 rounded-md sm:p-11 p-8">
                                    <span className="sm:w-80 sm:h-80 w-52 h-52 block bg-white rounded-full dark:bg-gray-700 p-2">
                                        <img className='rounded-full ' src={capitalize(onesearch.pic)} />
                                    </span>
                                </div>

                                <div className=" mt-1 w-full flex justify-center items-center sm:pt-4">
                                    <h2 className='text-lg sm:text-xl  font-normal text-purple-700'>{capitalize(onesearch.name)}</h2>
                                </div>
                                {/* </div > */}
                            </div>

                        </div>

                        {/* <!--Modal footer--> */}

                    </div>
                </div>
            </div>

        </>
    )
})

export default Modalcom;
