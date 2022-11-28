import mainReducer from './main';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    mainStore: mainReducer,
})

export default allReducers;