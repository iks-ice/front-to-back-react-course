import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import About from './Components/Pages/About';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import GithubState from './Components/Context/Github/GithubState';
import AlertState from './Components/Context/Alert/AlertState';
import './App.css';

const App = () => {
	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className="App">
						<Navbar />
						<div className="container">
							<Alert />
							<Switch>
								<Route exact path='/' render={props => (
									<>
										<Search />
										<Users />
									</>
								)} />
								<Route path='/about' component={About} />
								<Route path='/users/:login' component={User}
								/>
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
}

export default App;