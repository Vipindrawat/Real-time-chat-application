import React from 'react'
import { useNavigate } from 'react-router-dom';
import { allalertstates } from '../../context/alert/Alertstates';
import { alluserstates } from '../../context/user/UserStates';

const Signup = () => {
    const { alerthandle } = allalertstates();
    //Used for routes navigation-
    const navigate = useNavigate();
    //Using state and function defined in context api-
    const { signupcred, creatinguser, setsignupcred, password, setpassword, pic, setpic, loading, setloading } = alluserstates();

    //Validation for checking whether both password and confirm password matches or not-
    const passvalidation = () => {
        const cpassword = document.getElementById("cpassword");
        const fipassword = document.getElementById("password");

        if (fipassword.value != cpassword.value) {
            cpassword.setCustomValidity("Passwords does not match");
        }
        else {
            cpassword.setCustomValidity('');
        }
    }

    const picvalidation = () => {
        const pic = document.getElementById("pic");
        if (pic.files[0].type != "image/jpeg" && pic.files[0].type != "image/png") {
            pic.setCustomValidity("Please enter suitable image format");
        }
        else {
            pic.setCustomValidity('');
        }
    }
    //Onchange for name and email input form data-
    const onchange = (e) => {
        setsignupcred({ ...signupcred, [e.target.name]: e.target.value });
    }
    //Onchange for password and confirmpassword input form data-
    const onchangepass = (event) => {
        setpassword({ ...password, [event.target.name]: event.target.value });
        passvalidation();
    }
    //Onsubmit event function:
    const onsubmit = async (e) => {
        e.preventDefault();
        let imageurl;
        if (pic) {
            imageurl = await picuploadtocloudinary();
        }
        else {
            imageurl = null;
        }
        const json = await creatinguser(signupcred.name, signupcred.email, password.password, imageurl);
        if (json.success == true) {
            localStorage.setItem('token', json.token);
            navigate('/');
        }
        else {
            if (json.error == "email of this name already exists") {
                const vemail = document.getElementById("vemail");
                vemail.classList.remove("invisible");
                setTimeout(() => {
                    vemail.classList.add("invisible");
                }, 4000)
            }
            else {
                alerthandle("Error", "Internal server  error", "red");
                setsignupcred({ name: "", email: "" });
                setpassword({ password: "", cpassword: "" });
                setpic(null);
            }
        }
    }
    //Onclick for password visiblity mode-
    const onclick = () => {
        const password = document.getElementById("password");
        if (password.getAttribute("type") == "password") {
            password.setAttribute("type", "type");
        }
        else {
            password.setAttribute("type", "password");
        }
    }
    const conclick = () => {
        const cpassword = document.getElementById("cpassword");
        if (cpassword.getAttribute("type") == "password") {
            cpassword.setAttribute("type", "type");
        }
        else {
            cpassword.setAttribute("type", "password");
        }
    }

    const fileonchange = (e) => {
        setpic(e.target.files[0]);
        picvalidation();
    }

    const picuploadtocloudinary = async () => {
        try {
            setloading(true);
            const data = new FormData();
            data.append('file', pic);
            data.append("upload_preset", "Astacus");
            data.append("cloud_name", "djowzeksa");
            const response = await fetch("https://api.cloudinary.com/v1_1/djowzeksa/image/upload", {
                method: "post",
                body: data
            })
            const json = await response.json();
            const imageurl = json.url.toString();
            console.log(imageurl);
            setpic(imageurl);
            setloading(false);
            return imageurl;


        } catch (error) {
            console.log("internal server error");
        }
    }

    return (

        <div className=" flex w-full flex-col items-center ">

            <form onSubmit={onsubmit} className='rounded 2xl:w-2/6 lg:w-[46%] md:w-7/12 w-11/12  bg-white flex justify-center ' action="/.js">
                <div className=" w-11/12 my-5 bg-gray-300 px-8 py-4">

                    <label htmlFor="name" className='font-serif sm:text-2xl text-xl text-gray-800 '>Name: </label><br />
                    <input className=' border-2 border-gray-500 rounded-md sm:h-12 h-11 w-full pl-3 mb-4 mt-1 placeholder-purple-400 text-blue-700 sm:text-base text-sm' type="text" onChange={onchange} placeholder='Name should be of atleast 3 characters' id='name' name='name' minLength="3" required /><br />

                    <div>
                        <label htmlFor="email" className='font-serif sm:text-2xl text-xl text-gray-800'>Email :</label><br />
                        <input type="email" required className="mb-0 border-2 border-gray-500 rounded-md sm:h-12 h-11 w-full  pl-3  mt-1 placeholder-purple-400 text-blue-700 sm:text-base text-sm" onChange={onchange} id='email' placeholder='Email should be a valid email' name='email' /><br /><p className='invisible text-pink-700' id="vemail">Sorry, User with this email already exists</p><br />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className='font-serif sm:text-2xl  text-xl text-gray-800'>Password:</label><br />
                        <input className=' border-2 border-gray-500 rounded-md sm:h-12 h-11 w-full  pl-3 mb-4 mt-1  placeholder-purple-400 text-blue-700 sm:text-base text-xs' type="password" name="password" onChange={onchangepass} placeholder='Password should be of atleast 5 characters' id='password' minLength="5" required />
                        <i onClick={onclick} id="visiblity" className="fa-solid fa-eye  text-xl absolute right-4 sm:top-[3.10rem] top-11 hover:cursor-pointer" style={{ color: " #17191c" }}></i><br />
                    </div>

                    <div className="relative">
                        <label htmlFor="cpassword" className='font-serif sm:text-2xl  text-xl text-gray-800'>Confirm Password:</label><br />
                        <input className=' border-2 border-gray-500 rounded-md sm:h-12 h-11 w-full  pl-3 mb-4 mt-1  placeholder-purple-400 text-blue-700 sm:text-base text-xs' type="password" name="cpassword" onChange={onchangepass} placeholder='Password should be of atleast 5 characters' id='cpassword' minLength="5" required />
                        <i onClick={conclick} className="fa-solid fa-eye  text-xl absolute right-4 sm:top-[3.10rem] top-11 hover:cursor-pointer" style={{ color: " #17191c" }}></i><br />
                    </div>
                    <div>
                        <label htmlFor='fileinput' className='font-serif text-xl text-gray-800'>
                            <span className="text-gray-800 sm:text-2xl text-xl">Choose a image:</span>
                            <input type="file" id="pic" name="pic" accept="image/*" onChange={fileonchange} className="mt-1 p-2 border-2 border-white rounded w-full" />
                        </label>
                    </div>


                    <div className="flex justify-center">
                        <button type="submit" className='w-52 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded  mb-2 mt-3' >
                            <svg className={`animate-spin h-5 w-5 mr-3 ${loading == true ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.863 3.017 7.99l2.017-2.017zM20 12a8 8 0 01-8 8v4c3.627 0 9-5.373 9-12h-4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.863-3.017-7.99L18.983 6.71z"></path>
                            </svg>
                            {loading == true ? "Loading..." : "Create Account"}
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default Signup;

