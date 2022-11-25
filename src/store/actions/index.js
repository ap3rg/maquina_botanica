import StoreReducer from "../reducers/Reducer";
import * as con from "../../Constants"
import { combineReducers } from "redux";


export default combineReducers({
    [con.STORE]: StoreReducer,
})