import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const helloWorld = 'Welcome to The Road to learn React';
    const fullName = {
      name: 'Marquinhus',
      lastName: 'Gonçalves'
    };

    return (
      <div className="App">
        <h2>{`${helloWorld} ${fullName.name} ${fullName.lastName}`}</h2>
      </div>
    );
  }
}

export default App;
