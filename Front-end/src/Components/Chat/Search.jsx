import React from 'react'
import { alluserstates } from '../../context/user/UserStates';
import Loadsearch from './Loadsearch';
import Notfound from './Notfound';
import Searchitem from './Searchitem';

const Search = () => {
    const { searchinfo } = alluserstates();
    return (
        <div>
            {searchinfo && Array.isArray(searchinfo.result) && searchinfo.result.map((value, index) => {
                return <Searchitem spic={value.pic} sname={value.name} semail={value.email.slice(0, 15)} key={index} sid={value._id} />
            })}
            {!searchinfo && <Loadsearch />}
            {searchinfo && !Array.isArray(searchinfo.result) && <Notfound />}
        </div>
    )
}

export default Search;
