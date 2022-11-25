// Translate Functions
import * as con from "./../Constants"

// Application Parameters
const APPLICATION_PARAMETERS_TRANLATION_DICT = {
    [con.CAOS] : "Caos",
    [con.POSTER] : "Poster"
}

export const translateApplicationParamter = (appVal) => {

    if(appVal in APPLICATION_PARAMETERS_TRANLATION_DICT)
        return(APPLICATION_PARAMETERS_TRANLATION_DICT[appVal])

    return(appVal)
}


