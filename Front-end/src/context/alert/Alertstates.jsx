import React, { useContext, useState } from 'react'
import alertcontext from './Alertcontext'

const Alertstates = (props) => {
  const [alert, setalert] = useState({ tag: "", desc: "", color: "" });
  const alerthandle = (tag, desc, color) => {
    setalert({ tag, desc, color });
    setTimeout(() => {
      setalert({ tag: "", desc: "", color: "" })
    }, 4000)
  }

  const [notification, setnotification] = useState([]);
  return (
    <div>
      <alertcontext.Provider value={{ alert, alerthandle, notification, setnotification }}>
        {props.children}
      </alertcontext.Provider>
    </div>
  )
}

export const allalertstates = () => {
  return useContext(alertcontext);
}

export default Alertstates;
