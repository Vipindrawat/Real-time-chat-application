import axios from 'axios';
import React, { useContext, useState } from 'react'
import usercontext from './Usercontext'

const UserStates = (props) => {
  const url = "http://localhost:5000";
  const token = localStorage.getItem('token');

  // States and function required for signup component:
  const [signupcred, setsignupcred] = useState({ name: "", email: "" });
  const [password, setpassword] = useState({ password: "", cpassword: "" });
  const [loading, setloading] = useState(false);
  const [pic, setpic] = useState(null);
  const creatinguser = async (name, email, password, pic) => {
    setloading(true);
    // using signup api:
    const response = await axios.post(`${url}/api/user/signup`, { name, email, password, pic }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setloading(false);
    return response.data;
  }

  // States and function required for Login component:
  const [credential, setcredential] = useState({ lemail: "", lpassword: "" });

  // Using login api:
  const loginuser = async (email, password) => {
    const response = await axios.post(`${url}/api/user/login`, { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    return response.data;
  }

  //search states:
  const [search, setsearch] = useState("");
  const [searchinfo, setsearchinfo] = useState(null);
  //Using search api:
  const searchinguser = async (name) => {

    const response = await axios.get(`${url}/api/user/search?credential=${name}`, {
      headers: {
        'auth-token': token
      }
    })

    setsearchinfo(response.data);
  }

  // getting my information:
  const [mydata, setmydata] = useState(null);

  const getmyinfo = async () => {

    const response = await axios.get(`${url}/api/user/info`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    })
    setmydata(response.data);
  }

  const [onesearch, setonesearch] = useState({ name: "", pic: "" });

  //state for searching user for making group:
  const [gsearch, setgsearch] = useState("");
  return (
    < usercontext.Provider value={{ signupcred, creatinguser, setsignupcred, password, pic, setpic, setpassword, credential, setcredential, loginuser, loading, setloading, getmyinfo, mydata, search, searchinguser, setsearch, searchinfo, onesearch, setonesearch, gsearch, setgsearch }}>
      {props.children}
    </usercontext.Provider>
  )
}
export const alluserstates = () => {
  return useContext(usercontext);
}

export default UserStates;
