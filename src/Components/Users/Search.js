import React, {useState, useContext} from 'react';
import GithubContext from '../Context/Github/GithubContext'
import AlertContext from '../Context/Alert/AlertContext'

const Search = () => {

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const {clearUsers, users} = githubContext;
    const {setAlert} = alertContext;

    const [text, setText] = useState('');
    const input = event => setText(event.target.value);
    const submit = event => {
        event.preventDefault();
        text === '' ?
            setAlert('Please enter search query', 'light') :
            githubContext.searchUsers(text);
        setText('');
    }
    const click = () => clearUsers();
    return (
        <>
            <form className='form' onSubmit={submit} >
                <input
                    type="text"
                    name='text'
                    placeholder='Search users...'
                    value={text}
                    onChange={input} />
                <input
                    type="submit"
                    value="Search"
                    className='btn btn-dark btn-block'
                />
            </form>
            {users.length !== 0 && <button className='btn btn-light btn-block' onClick={click}>Clear</button>}
        </>
    )
}


export default Search;
