import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'



const Useritem = ({user: {avatar_url, login}}) => {
    return (
        <div className='card text-center'>
            <img src={avatar_url}
                alt=""
                className="round-img"
                style={{width: '60px'}} />
            <h3>{login}</h3>
            <div>
                <Link to={`/users/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>
        </div>
    )
}

Useritem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Useritem
