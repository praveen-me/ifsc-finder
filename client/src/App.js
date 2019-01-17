import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import io from 'socket.io-client';

import './scss/app.scss';

const socket = io('http://localhost:8001')

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
