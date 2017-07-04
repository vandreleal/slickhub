import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import GithubRepositories from './components/GithubRepositories/GithubRepositories';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Github Explorer</h2>
          </div>

          <GithubRepositories sort="stars" order="desc" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
