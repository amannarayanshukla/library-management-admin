import React, {Component} from 'react';

import Dashboard from "./components/Dashboard/Dashboard";
import Login from './components/Login/Login'

import './App.css';

class App extends Component{
  state = {
    isLoggedIn : false,
  };

  login = () => {

    this.setState({isLoggedIn : true})
  };

  render() {
    return (
        <div className="container">
          {
            this.state.isLoggedIn ?
                <Dashboard/>
                :
              <Login login={this.login}/>
          }
        </div>
    );
  }
}

export default App;
