import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'


import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [...state, action.payload]
    default:
      return state;
  }
};

const SagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({
    plantList
  }),
  applyMiddleware(
    SagaMiddleware,
    logger
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);