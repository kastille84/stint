import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import axios from 'axios';

import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userReducer from './store/reducers/user';
import scheduleReducer from './store/reducers/schedule';

const rootReducer = combineReducers({
    userRedux: userReducer ,
    scheduleRedux: scheduleReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

//axios.defaults.baseURL="http://localhost:5000/api";
axios.defaults.baseURL="https://murmuring-peak-16111.herokuapp.com/api";


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>    
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
