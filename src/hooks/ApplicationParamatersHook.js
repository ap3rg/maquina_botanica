import { useSelector } from 'react-redux';

import * as con from "../Constants"
import { setApplicationParameter } from '../store/actions/applicationParameters';


/**
 * Hook for a single application parameter in the store read only
 */
export function RefApplicationParameterHook(parameterName) {

    const value = useSelector(state => state[con.STORE][con.REDUCER_APPLICATION_PARAMETERS][parameterName])

    return(value);
}


/**
 * Hook for a single application parameter in the store read and write
 */
 export function StateApplicationParameterHook(parameterName) {

    const value = useSelector(state => state[con.STORE][con.REDUCER_APPLICATION_PARAMETERS][parameterName])

    const setParameter = (newVal) => setApplicationParameter(parameterName, newVal)

    return([value, setParameter]);
}