import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import githubReducer from './GithubReducer';
import {
    SEARCH_USERS,
    CLEAR_USERS,
    SET_LOADING,
    GET_REPOS,
    GET_USERS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'prod') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    //Search Users
    const searchUsers = async query => {
        setLoading();

        let res = await axios.get(`https://api.github.com/search/users?q=${query}&
		client_id=${githubClientId}&client_secret=${githubClientSecret}`)
            .catch(err => console.log(err));

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    }
    // Get User
    const getUser = async username => {
        setLoading();

        let res = await axios.get(`https://api.github.com/users/${username}?
		client_id=${githubClientId}&client_secret=${githubClientSecret}`)
            .catch(err => console.log(err));

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    }

    //Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    //Clear Users
    const clearUsers = () => dispatch({type: CLEAR_USERS});

    // Get User Repos
    const getUserRepos = async username => {
        setLoading();

        let res = await axios.get(`https://api.github.com/users/${username}/repos?
		per_page=5&sort=create:asc&
		client_id=${githubClientId}&client_secret=${githubClientSecret}`)
            .catch(err => console.log(err));

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            alert: state.alert,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
    </GithubContext.Provider>
}
export default GithubState;

