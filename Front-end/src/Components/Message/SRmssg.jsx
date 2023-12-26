import React, { useEffect, useState } from 'react'
import Singlemessage from './Singlemessage';
import socket from '../Socket';
var selectedchatcompare, localstate;
import Loading from './Loading.gif'
import { allalertstates } from '../../context/alert/Alertstates';
import { allmessagestates } from '../../context/Message/Messagestates';

const SRmssg = (props) => {
    const [loading, setloading] = useState([]);
    const [sampleid, setsampleid] = useState("");
    const [load, setload] = useState(false);

    const { notification, setnotification } = allalertstates();

    const { id } = props;
    const { gettingallmssg, allmessages, setallmessages, messages } = allmessagestates();

    useEffect(() => {
        setsampleid(id);
        gettingallmssg(id);
        selectedchatcompare = id;
        let data = loading;
        setload(checkloading(data));
        if (notification.length != 0) {
            const notif = notification.filter((value) => {
                return value.id != id;
            })
            if (notification.length != notif.length) {
                setnotification(notif);
            }
        }
    }, [id])

    useEffect(() => {
        localstate = allmessages;
    }, [allmessages])

    const formatdate = (tarik) => {
        const dateTime = new Date(tarik);

        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1; // Months are zero-based
        const day = dateTime.getDate();

        return { day, month, year };
    }
    let norepeat;
    const middle = (value) => {
        const messagedate = formatdate(value.createdAt);
        const newdate = new Date();
        const currentdate = formatdate(newdate);
        if (messagedate.day == currentdate.day && messagedate.month == currentdate.month && messagedate.year == currentdate.year) {
            if (norepeat != "Today") {
                norepeat = "Today"
                return "Today";
            }
            else {
                return false;
            }
        }
        else {
            let convert = `${messagedate.day}/${messagedate.month}/${messagedate.year}`;
            if (norepeat != convert) {
                norepeat = `${messagedate.day}/${messagedate.month}/${messagedate.year}`
                return norepeat;
            }
            else {
                return false;
            }
        }
    }
    useEffect(() => {
        socket.on("receive", (response) => {
            console.log("inside receive");

            if (selectedchatcompare != response.chat._id || messages.name == "") {
                const findinginarray = notification.filter((value) => {
                    return value.id == response.chat._id;
                })
                if (findinginarray.length != 1) {
                    console.log("inside if");
                    const exists = notification;
                    const obj = {
                        id: response.chat._id
                    }
                    exists.push(obj);
                    console.log(exists);
                    console.log(notification)
                    setnotification(exists);
                }
            }
            else {
                const newarray = [...localstate, response];
                setallmessages(newarray);
            }
        })
        socket.on("show loading", (room) => {
            const check = loading.filter((val) => {
                return val.room = room;
            })
            if (check.length != 1) {
                const newarray = loading;
                const obj = { typing: true, room };
                newarray.push(obj);
                setloading(newarray);
                setload(checkloading(newarray));
            }
            // setroomid(room);
        })
        socket.on("stop loading", (room) => {
            const filterarray = loading.filter((value) => {
                return room != value.room;
            })
            setloading(filterarray);
            setload(checkloading(filterarray));
        })
    })

    const checkloading = (array) => {
        const foundobj = array.filter((val) => {
            return val.room == selectedchatcompare;
        })

        if (foundobj.length == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    return (
        <>
            {allmessages && allmessages.map((value, index) => {
                let midtime = middle(value);
                return <Singlemessage message={value.message} id={value.sender._id} key={index} date={value.createdAt} midtime={midtime} />
            })}
            {load && <div className="float-left clear-both bg-white rounded my-2 ml-4"> <img className='h-11 w-20 rounded' src={Loading} />
            </div>}
        </>
    )
}

export default SRmssg;