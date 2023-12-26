import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allchatstates } from '../../context/chats/Chatstates';
import messagecontext from '../../context/Message/Messagecontext';
import { allmessagestates } from '../../context/Message/Messagestates';
import { alluserstates } from '../../context/user/UserStates';
import Chatcomponent from './Chatcomponent';

const Chats = () => {
    const navigate = useNavigate();
    const { mydata } = alluserstates();

    const { allchats, fetchallchats } = allchatstates();
    const { allmessages } = allmessagestates();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
        else {
            fetchallchats();
        }
    }, [])

    useEffect(() => {
        fetchallchats();
    }, [allmessages.length])

    const findname = (value) => {
        if (value.isGroupChat == true) {
            const allusersinfo = value.users.filter((val) => {
                if (val._id != mydata.userdata._id) {
                    return { name: val.name, pic: val.pic, id: val._id };
                }
            })
            return { name: value.chatName, pic: null, groupchat: true, users: allusersinfo }
        }
        else {
            const newarray = value.users.filter((val) => {
                if (val._id != mydata.userdata._id) {

                    return { name: val.name, pic: val.pic, groupchat: false, users: [] }
                }
            })
            return newarray[0];
        }
    }

    const findsender = (value) => {
        if (value.latestMessage) {
            if (value.latestMessage.sender._id == mydata.userdata._id) {
                return { sender: "You", message: value.latestMessage.message }
            }
            else {
                return { sender: value.latestMessage.sender.name, message: value.latestMessage.message }
            }
        }
        else {
            return { sender: "", message: "" };
        }
    }

    const formatdate = (date) => {
        const dateTime = new Date(date);

        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1; // Months are zero-based
        const day = dateTime.getDate();

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        // Construct the formatted time
        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

        return { day, month, year, time: formattedTime }
    }

    const finddate = (value) => {
        const updatedAtdate = formatdate(value.updatedAt);
        const current = new Date();
        const currentdate = formatdate(current);
        if (updatedAtdate.day == currentdate.day && updatedAtdate.month == currentdate.month && updatedAtdate.year == currentdate.year) {
            return updatedAtdate.time;
        }
        else {
            const finaldate = `${updatedAtdate.day}-${updatedAtdate.month}-${updatedAtdate.year}`
            return finaldate;
        }
    }

    return (
        <>
            {mydata != null && allchats != null && allchats.chats.map((value, index) => {
                let username = findname(value);
                const sender = findsender(value);
                const date = finddate(value);
                return <Chatcomponent key={value._id} name={username.name} sender={sender.sender} message={sender.message.slice(0, 13)} date={date} pic={username.pic} id={value._id} groupchat={username.groupchat} users={username.users} />
            })}
        </>
    )
}

export default Chats;
