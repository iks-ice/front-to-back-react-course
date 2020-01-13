import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Pages/Home';
import NotFound from './Components/Pages/NotFound';
import About from './Components/Pages/About';
import User from './Components/Users/User';
import Alert from './Components/Layout/Alert';
import GithubState from './Components/Context/Github/GithubState';
import AlertState from './Components/Context/Alert/AlertState';
import './App.css';

const App = () => (
	<GithubState>
		<AlertState>
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Alert />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/about' component={About} />
							<Route path='/users/:login' component={User} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</Router>
		</AlertState>
	</GithubState>
)

export default App;