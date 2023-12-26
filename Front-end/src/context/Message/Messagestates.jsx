import axios from 'axios';
import React, { useContext, useState } from 'react'
import messagecontext from './Messagecontext';

const Messagestates = (props) => {
    const url = "http://localhost:5000/api/message"
    const token = localStorage.getItem('token');

    const [messages, setmessages] = useState({ name: "", pic: "", id: "" });
    const [allmessages, setallmessages] = useState([]);
    // fetching all the messages in one chat:
    const gettingallmssg = async (id) => {
        const response = await axios.get(`${url}/getmessage/${id}`, {
            headers: {
                'auth-token': token
            }
        })
        setallmessages(response.data.message);
    }

    const [inputmessage, setinputmessage] = useState("");

    // For sending the message:
    const messagesender = async (message, chatId) => {
        const response = await axios.post(`${url}/send`, { message, chatId }, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        return response.data.message;
    }

    const capitalize = (name) => {
        const lower = name.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    const [showmessages, setshowmessages] = useState(false);

    return (
        <messagecontext.Provider value={{ messages, setmessages, gettingallmssg, allmessages, setallmessages, inputmessage, setinputmessage, messagesender, capitalize, setshowmessages, showmessages }}>
            {props.children}
        </messagecontext.Provider>
    )
}
export const allmessagestates = () => {
    return useContext(messagecontext);
}

export default Messagestates;
