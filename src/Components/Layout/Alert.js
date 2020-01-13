import React, {useContext} from 'react';
import AlertContext from '../Context/Alert/AlertContext';

const Alert = () => {

    const alertContext = useContext(AlertContext);
    const {alert} = alertContext;
    console.log();
    return alert !== null && (
        <div>
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.msg}
            </div>
        </div>
    )
}
export default Alert;
