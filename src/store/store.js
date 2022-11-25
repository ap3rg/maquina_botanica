
import { createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk"
import rootReducer from './actions'


// Initial state
const initialState = {} 

// Middleware
const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));


export default store;