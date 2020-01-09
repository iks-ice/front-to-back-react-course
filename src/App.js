import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Layout/Navbar';
import About from './Components/Pages/About'
import './App.css';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';





class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	}

	search = async query => {
		this.setState({loading: true});

		let res = await axios.get(`https://api.github.com/search/users?q=${query}&
		client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
			.catch(err => console.log(err));

		this.setState({users: res.data.items, loading: false})
	}

	getUser = async username => {
		this.setState({loading: true});

		let res = await axios.get(`https://api.github.com/users/${username}?
		client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
			.catch(err => console.log(err));

		this.setState({user: res.data, loading: false})
	}
	getUserRepos = async username => {
		this.setState({loading: true});

		let res = await axios.get(`https://api.github.com/users/${username}/repos?
		per_page=5&sort=create:asc&
		client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
			.catch(err => console.log(err));

		this.setState({repos: res.data, loading: false})
	}
	clearUsers = () => this.setState({users: [], loading: false});

	setAlert = (msg, type) => {
		this.setState({alert: {msg, type}});
		setTimeout(() => this.setState({alert: null}), 5000);
	};

	render () {
		const {loading, users, user, alert, repos} = this.state;
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route exact path='/' render={props => (
								<>
									<Search
										search={this.search}
										clearUsers={this.clearUsers}
										showClear={users.length !== 0}
										setAlert={this.setAlert} />
									<Users loading={loading} users={users} />
								</>
							)} />
							<Route path='/about' component={About} />
							<Route path='/users/:login' render={props => (
								<User {...props}
									user={user}
									loading={loading}
									getUser={this.getUser}
									getUserRepos={this.getUserRepos}
									repos={repos} />
							)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
