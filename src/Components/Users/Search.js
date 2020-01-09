import React, {useState} from 'react';
import PropTypes from 'prop-types'

const Search = ({search, clearUsers, showClear, setAlert}) => {
    const [text, setText] = useState('');
    const input = event => setText(event.target.value);
    const submit = event => {
        event.preventDefault();
        text === '' ?
            setAlert('Please enter search query', 'light') :
            search(text);
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
            {showClear && <button className='btn btn-light btn-block' onClick={click}>Clear</button>}
        </>
    )
}

Search.propTypes = {
    search: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
}

export default Search;
