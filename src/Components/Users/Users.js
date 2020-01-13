import React, {useContext} from 'react';
import Useritem from './UserItem';
import Spinner from '../Layout/Spinner';
import GithubContext from '../Context/Github/GithubContext'

const Users = () => {
    const githubContext = useContext(GithubContext);
    const {users, loading} = githubContext;
    return loading ?
        <Spinner /> :
        <div style={userStyle}>
            {users.map(user => <Useritem key={user.id} user={user} />)}
        </div>
}


const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
