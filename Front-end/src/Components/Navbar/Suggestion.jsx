import React, {  useEffect, useState } from 'react'
import { allchatstates } from '../../context/chats/Chatstates';
import { alluserstates } from '../../context/user/UserStates';
import SuggItem from './SuggItem';

const Suggestion = () => {

    const { allchats } = allchatstates();
    const { mydata } = alluserstates();

    const [filterallchat, setfilterallchat] = useState(null);

    const filterchats = () => {
        if (allchats != null) {
            let newchats = allchats.chats.filter((value) => {
                return value.isGroupChat == false;
            })
            setfilterallchat(newchats);
        }
    }

    useEffect(() => {
        filterchats();
    }, [allchats])

    const findname = (value) => {
        const newarray = value.users.filter((val) => {
            if (val._id != mydata.userdata._id) {

                return val;
            }
        })
        return newarray[0];
    }

    return (
        <>
            {filterallchat != null && filterallchat.slice(0, 4).map((value, index) => {
                const getname = findname(value);
                return <SuggItem name={getname.name} pic={getname.pic} key={index} id={getname._id} email={getname.email} />
            })}
        </>
    )
}

export default Suggestion;
