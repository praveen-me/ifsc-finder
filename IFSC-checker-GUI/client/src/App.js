import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';

import './scss/app.scss';

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
