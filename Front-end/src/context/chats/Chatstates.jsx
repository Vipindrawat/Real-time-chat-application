import axios from 'axios';
import React, { useContext, useState } from 'react'
import chatcontext from './Chatcontext';

const Chatstates = (props) => {
    const url = "http://localhost:5000/api/chat"
    const token = localStorage.getItem('token');

    const [allchats, setallchats] = useState(null);

    // fetching all chats:
    const fetchallchats = async () => {
        const response = await axios.get(`${url}/getchat`, {
            headers: {
                'auth-token': token
            }
        })
        setallchats(response.data);
    }

    //for creating or geting one-one chat:
    const creatingchat = async (userId) => {
        console.log(userId);
        const response = await axios.post(`${url}/create`, { userId }, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        const newarray = allchats.filter((value) => {
            return response.data.chat._id == value._id;
        })
        console.log(newarray.length);
        if (newarray.length == 0) {
            console.log("got response");
            const newchat = allchats;
            newchat.push(response.data.chat);
            setallchats(newchat);
        }
    }
    // member selection state:
    const [memberselect, setmemberselect] = useState([]);
    const [memberno, setmemberno] = useState(0);
    const [groupname, setgroupname] = useState();

    // Request for creating group:
    const creatinggroup = async (users, chatName) => {
        const response = await axios.post(`${url}/group`, { users, chatName }, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        response.data;
    }

    // For  edit :
    const [edit, setedit] = useState(false);
    const [groupid, setgroupid] = useState(null);

    // Request for editing group:
    const groupediting = async (users, chatName, id) => {
        const response = await axios.put(`${url}/edit/${id}`, { users, chatName }, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        if (response.data.sucess == true) {
            console.log("group edited successfully");
        }

    }

    return (
        <chatcontext.Provider value={{ allchats, fetchallchats, creatingchat, memberselect, setmemberselect, groupname, setgroupname, creatinggroup, edit, setedit, groupediting, groupid, setgroupid, memberno, setmemberno }}>
            {props.children}
        </chatcontext.Provider>
    )
}

export const allchatstates = () => {
    return useContext(chatcontext);
}

export default Chatstates;
