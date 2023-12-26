import React from 'react'
import { allalertstates } from '../../context/alert/Alertstates';

const Alert = () => {
    const { alert } = allalertstates();
    return (
        <div>
            <div className='h-10 mb-1'>
                {console.log(alert.color)}
                {alert.tag != "" && <div className={`bg-green-100 border border-${alert.color}-400 text-${alert.color}-700 px-4 py-3 rounded relative`} role="alert">
                    <strong className="font-bold">{alert.tag}:</strong>
                    <span className="block sm:inline">{alert.desc}</span>
                </div>}
            </div>
        </div>
    )
}

export default Alert;
