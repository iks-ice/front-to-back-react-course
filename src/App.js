import React, {Component} from 'react';
import Navbar from './Components/Layout/Navbar';
import axios from 'axios';
import './App.css';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert'



class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null
	}
	async componentDidMount () {
		this.setState({loading: true});
		let res = await axios.get(`https://api.github.com/users?
		client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
		this.setState({users: res.data, loading: false})
	}
	search = async query => {
		this.setState({loading: true});
		let res = await axios.get(`https://api.github.com/search/users?q=${query}&
		client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
			.catch(err => console.log(err));
		this.setState({users: res.data.items, loading: false})
	}
	clearUsers = () => this.setState({users: [], loading: false});

	setAlert = (msg, type) => {
		this.setState({alert: {msg, type}});
		setTimeout(() => this.setState({alert: null}), 5000);
	};

	render () {
		const {loading, users, alert} = this.state;
		return (
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={alert} />
					<Search
						search={this.search}
						clearUsers={this.clearUsers}
						showClear={users.length !== 0}
						setAlert={this.setAlert} />
					<Users loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;
