import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import app from './store/reducers.js'
import Timetable from "./components/Timetable";

const store = createStore(
  app,
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Timetable />
      </Provider>
    );
  }
}

export default App;
