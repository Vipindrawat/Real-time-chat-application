import React from 'react'
import { useNavigate } from 'react-router-dom';
import { alluserstates } from '../../context/user/UserStates';
import { allalertstates } from '../../context/alert/Alertstates';


const Login = () => {
    const { alerthandle } = allalertstates();
    const navigate = useNavigate();
    //importing state and function from context api:
    const { credential, setcredential, loginuser } = alluserstates();

    const onsubmit = async (e) => {
        e.preventDefault();
        const json = await loginuser(credential.lemail, credential.lpassword);
        if (json.success == true) {
            localStorage.setItem("token", json.token);
            navigate('/');
        }
        else {
            if (json.success == false) {
                const valid = document.getElementById("valid");
                valid.classList.remove("invisible");
                setTimeout(() => {
                    valid.classList.add("invisible");
                }, 2500);
            }
            else {
                alerthandle("Error", "Internal server error", "red");
            }
        }
    }

    const onchange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value });
    }

    const onclick = () => {
        const lpassword = document.getElementById("lpassword");
        if (lpassword.getAttribute("type") == "password") {
            lpassword.setAttribute("type", "type");
        }
        else {
            lpassword.setAttribute("type", "password");
        }
    }

    return (
        <div className=" flex items-center flex-col w-full  ">

            <form onSubmit={onsubmit} className='rounded 2xl:w-2/6 lg:w-[46%] md:w-7/12 w-11/12  bg-white flex justify-center ' action="/.js">
                <div className=" w-11/12 mt-16 mb-8 bg-gray-300 p-7 rounded-md">

                    <label htmlFor="lemail" className='font-serif sm:text-2xl text-xl text-black'>Email :</label><br />
                    <input type="email" required className="mb-5 border-2 border-gray-500 rounded sm:h-14 h-11 w-full  pl-3  mt-1 placeholder-purple-400 text-blue-700 sm:text-base text-sm " onChange={onchange} id='lemail' placeholder='Email should be a valid email' name='lemail' /><br />

                    <div className="relative">
                        <label htmlFor="lpassword" className='font-serif sm:text-2xl  text-xl text-black'>Password:</label><br />
                        <input className=' border-2 border-gray-500 rounded sm:h-14 h-11 w-full  pl-3 sm:mb-5 mb-4 mt-1  placeholder-purple-400 text-blue-700 sm:text-base text-xs' type="password" name="lpassword" onChange={onchange} placeholder='Password should be of atleast 5 characters' id='lpassword' minLength="5" required />
                        <i onClick={onclick} id="lvisiblity" className="fa-solid fa-eye sm:text-2xl text-xl absolute right-4 sm:top-[3.25rem] top-11 hover:cursor-pointer" style={{ color: "#17191c" }}></i><br />
                        <p className='invisible text-pink-700' id="valid">Please enter valid credentials</p><br />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className='w-52 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-4 mt-1' >Log in</button>
                    </div>

                </div>
            </form>


        </div>
    )
}

export default Login
