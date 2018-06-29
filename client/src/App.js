import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom'
import './App.css';

import Main from './components/main/main';
import RequireAuth from './components/auth/auth';
import Login from './components/auth/login';
import Logout from './components/auth/logout';

import { Redirect } from 'react-router'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentLocation: ""
    }
  }

  componentWillMount() {
    this.setState({currentLocation: window.location.pathname});
    // this.props.history.push('/home');
    
  }
  // static contextTypes = {
  //   router: React.PropTypes.object.isRequired
  // }

  render() {
    return (
      <Router>
        <div className="App">
          { 
            this.state.currentLocation === "/" && <Redirect from='/' to='/home'/>     
          }
          <Route path='/home' component={RequireAuth(Main)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          {/* <Route exact path='/todo' component={RequireAuth(Todo)} /> */}
          
        </div>
      </Router>
    );
  }
}

export default App;
