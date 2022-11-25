// Reducer for all the store

import * as types from "../actions/types"
import * as con from "../../Constants"


// Model Keys
// Name of each "independent" store
const APPLICATION_PARAMETERS = con.REDUCER_APPLICATION_PARAMETERS


const initialState = {
    
    // Default states
    [APPLICATION_PARAMETERS] : {[con.SELECTED_MODE] : con.CAOS,
                                [con.SELECTED_IMAGES] : {},
                                [con.SELECTED_COMBINATION] : []}
                                
    
}


export default function setStateFun(state = initialState, action)
{

    // Global variables

    let parameterId = null;
    let parameterValue = null;
    
    switch(action.type){

        // Application Parameters
        case types.SET_APPLICATION_PARAMETER:

            
            parameterId = action.payload[con.ID]
            parameterValue = action.payload[con.VALUE]

            let currentParameters = state[APPLICATION_PARAMETERS]
            currentParameters[parameterId] = parameterValue
            
            return  {...state, 
                        [APPLICATION_PARAMETERS] : {...currentParameters}}
            
            
        default:
            return(state)       

    }    



}
