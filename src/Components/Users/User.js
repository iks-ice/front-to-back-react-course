import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';
import {Link} from 'react-router-dom';
import Repos from '../Repos/Repos'



const User = ({getUser, getUserRepos, match: {params: {login}}, loading, user, repos}) => {

    useEffect(() => {
        getUser(login);
        getUserRepos(login);
    }, [getUser, getUserRepos, login]);
    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        company
    } = user;
    return loading ? <Spinner /> :
        <>
            <Link to='/' className='btn btn-light'>Back to search</Link>
            Hireable:{' '}
            {hireable ?
                <i className="fas fa-check text-success" /> :
                <i className="fas fa-times-circle text-danger" />
            }
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="" className="round-img" style={{width: '150px'}} />
                    <h1>{name}</h1>
                    <p>{location}</p>
                </div>
                <div>
                    {bio && <>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </>}
                    <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && (
                                <>
                                    <strong>Username: </strong> {login}
                                </>
                            )}
                        </li>

                        <li>
                            {company && (
                                <>
                                    <strong>Company: </strong> {company}
                                </>
                            )}
                        </li>

                        <li>
                            {blog && (
                                <>
                                    <strong>Website: </strong> {blog}
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </>

}

User.propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
}

export default User;

