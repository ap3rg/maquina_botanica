// Translate Functions
import * as con from "./../Constants"

// Application Parameters
const APPLICATION_PARAMETERS_TRANLATION_DICT = {
    [con.CAOS] : "Caos",
    [con.POSTER] : "Lámina",
    [con.BOOK_1] : "Diccionario universal de física",
    [con.BOOK_2] : "Descripción de las plantas",
    [con.BOOK_3] : "Recueil des plants",
    [con.BOOK_4] : "Cartas físico matemáticas",
    [con.BOOK_5] : "Cirujano instruido",
}

export const translateApplicationParamter = (appVal) => {

    if(appVal in APPLICATION_PARAMETERS_TRANLATION_DICT)
        return(APPLICATION_PARAMETERS_TRANLATION_DICT[appVal])

    return(appVal)
}


