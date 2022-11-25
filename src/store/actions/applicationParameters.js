// Actions for the model parameters reducer
import * as types from "./types"
import store from '../store';
import * as con from "./../../Constants"




// Set Application Parameter 
export const setApplicationParameter = (id, value) =>
{    

    let payload = {[con.ID]: id, [con.VALUE] : value}

    store.dispatch({
        type : types.SET_APPLICATION_PARAMETER,
        payload : payload
    })
}