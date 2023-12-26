import React from 'react'
import { alluserstates } from '../../context/user/UserStates';
import Notfound from '../Chat/Notfound';
import Gsearchitem from './Gsearchitem';

const Gsearch = () => {
    const { searchinfo } = alluserstates();
    return (
        <div>
            {searchinfo && Array.isArray(searchinfo.result) && searchinfo.result.map((value, index) => {
                return <Gsearchitem spic={value.pic} sname={value.name} semail={value.email.slice(0, 15)} key={index} sid={value._id} />
            })}
            {searchinfo && !Array.isArray(searchinfo.result) && <Notfound />}
        </div>
    )
}

export default Gsearch;
