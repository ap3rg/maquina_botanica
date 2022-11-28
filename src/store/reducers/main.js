import * as con from "../../Constants"
import versosJson from "../../resources/versos.json"

const innitState = {
    [con.MODE]: con.CAOS,
    [con.COMBINATIONS]: [],
    [con.LAYERS]: [],
    [con.VERSOS]: versosJson.data,
}

const randNumRange = (min, max) => {
    return Math.random() * (max - min) + min;
}

const getXPosition = (width, divisor) => {
    let x = randNumRange(0, (width / divisor));

    return x
}

const getYPosition = (height, divisor) => {
    let y = randNumRange(0, (height / divisor));

    return y
}

const newLayer = (layers, state) => {
    // Receives a list of layer_names and returns a list of 
    // layers with its parameters (e.g. {"background": {"color": "black", "size": "100"}})
    const layerState = [];
    let combinatoria = state[con.COMBINATIONS].map((i) => {return parseInt(i)});
    let sourcesIds = combinatoria.length > 1 ? [combinatoria[0], combinatoria[1]] : combinatoria.length > 0 ? [combinatoria[0]] : [];
    let sources = []
    for(let i of sourcesIds) {
        if(i !== null) {
            sources.push(state.versos[i-1].name)
        } 
    }
    let mode = state.mode;

    for (let i = 0; i < layers.length; i++) {
        let l = layers[i]
        let layer = {}
        let coin = randNumRange(0, 1) > 0.5 ? 1 : 0
        switch(l) {
            case con.BACKGROUND_LAYER:
                if(sourcesIds.length > 0) {
                    let backgroundColor = con.BACKGROUNDS[Math.floor(Math.random()*con.BACKGROUNDS.length)];
                    layer[con.BACKGROUND_LAYER] = {"color" : backgroundColor}
                } else {
                    layer[con.BACKGROUND_LAYER] = null;
                }
                break;
            case con.VERSOS_LAYER:
                if(sourcesIds.length > 0) {

                    let text1;
                    let text2;
                    if(sourcesIds.length > 1) {
                        let textoId1 = sourcesIds[0];
                        let textoId2 = sourcesIds[1];

                        // Add text
                        let textArray1 = state[con.VERSOS][textoId1 - 1].versos // one more than array index
                        text1 = textArray1[Math.floor(Math.random()*textArray1.length)]

                        let textArray2 = state[con.VERSOS][textoId1 - 1].versos // one more than array index
                        text2 = textArray2[Math.floor(Math.random()*textArray2.length)]

                    } else {
                        let textoId1 = sourcesIds[Math.floor(Math.random()*sourcesIds.length)];
                        let textoId2 = null;
                        // Add text
                        let textArray1 = state[con.VERSOS][textoId1 - 1].versos // one more than array index
                        text1 = textArray1[Math.floor(Math.random()*textArray1.length)]
                        text2 = ""

                    }
                    
                    // Add color to text
                    let textColor1 = con.VERSOS_COLORS[Math.floor(Math.random()*con.VERSOS_COLORS.length)];
                    let textColor2 = con.VERSOS_COLORS[Math.floor(Math.random()*con.VERSOS_COLORS.length)];


                    // Font
                    let fontFamily = con.FONT_FAMILYS[Math.floor(Math.random()*con.FONT_FAMILYS.length)];
                    let fontWeight = con.FONT_WEIGHTS[Math.floor(Math.random()*con.FONT_WEIGHTS.length)];

                    // Mode dependent attrs
                    // Width
                    // Position
                    let textWidth;
                    let x;
                    let y;
                    let fontSize;
                    if (state.mode === con.POSTER) {
                        textWidth = randNumRange(con.POSTER_VIEWBOX_WIDTH / 3, con.POSTER_VIEWBOX_WIDTH)
                        x = con.POSTER_TEXT_POSX;
                        y = con.POSTER_TEXT_POSY;
                        fontSize = 0;

                    } else if (state.mode === con.CAOS) {
                        textWidth = randNumRange(con.CAOS_VIEWBOX_WIDTH / 3, con.CAOS_VIEWBOX_WIDTH)
                        x = randNumRange(5, (con.CAOS_VIEWBOX_WIDTH - textWidth));
                        y = randNumRange(5, con.CAOS_VIEWBOX_HEIGHT / 2);
                        fontSize = randNumRange(2, 10);
                    }
                    
                    layer[con.VERSOS_LAYER] = {
                        "color1" : textColor1, 
                        "color2" : textColor2,
                        "text1": text1,
                        "text2": text2,
                        "font-family": fontFamily,
                        "font-weight": fontWeight,
                        "source": sources,
                        "width": textWidth,
                        "x": x,
                        "y": y,
                        "font-size": fontSize,
                        "coin": coin
                    }
                } else {
                    layer[con.VERSOS_LAYER] = null
                }
                break;
                
            case con.FRAGMENTOS_BOTANICOS_LAYER:
                if(sourcesIds.length > 0) {
                    let fragmento = con.FRAGMENTOS_BOTANICOS[Math.floor(Math.random()*con.FRAGMENTOS_BOTANICOS.length)];
                    // Position
                    if(mode === con.POSTER){
                        let x = getXPosition(con.POSTER_VIEWBOX_WIDTH, 4);
                        let y =  getYPosition(con.POSTER_VIEWBOX_HEIGHT, 4);
                        layer[con.FRAGMENTOS_BOTANICOS_LAYER] = {
                            "img" : fragmento, 
                            "x": x, 
                            "y": y,
                            "width": (4 * con.POSTER_VIEWBOX_WIDTH / 6),
                            "coin": coin
                        }
                    } else if(mode === con.CAOS) {
                        let x = getXPosition(con.CAOS_VIEWBOX_WIDTH, 4);
                        let y =  getYPosition(con.CAOS_VIEWBOX_HEIGHT, 4);
                        layer[con.FRAGMENTOS_BOTANICOS_LAYER] = {
                            "img" : fragmento, 
                            "x": x, 
                            "y": y,
                            "width": randNumRange(con.POSTER_VIEWBOX_WIDTH / 6, (5 * con.POSTER_VIEWBOX_WIDTH / 6)),
                            "coin": coin
                        }
                    }
                } else {
                    layer[con.FRAGMENTOS_BOTANICOS_LAYER] = null
                }
                break;
            case con.FIGURAS_MATEMATICAS_LAYER:
                if(sourcesIds.length > 0) {
                    let rotationAngle;
                    if (state.mode === con.POSTER) {
                        rotationAngle = con.POSTER_ROTATION_ANGLES[Math.floor(Math.random()*con.POSTER_ROTATION_ANGLES.length)];
                    } else if(state.mode === con.CAOS) {
                        rotationAngle = con.CAOS_ROTATION_ANGLES[Math.floor(Math.random()*con.CAOS_ROTATION_ANGLES.length)];
                    }
                    let figura = con.FIGURAS_MATEMATICAS[Math.floor(Math.random()*con.FIGURAS_MATEMATICAS.length)];
                    // Position
                    if(mode === con.POSTER){
                        let x = getXPosition(con.POSTER_VIEWBOX_WIDTH, 10);
                        let y =  getYPosition(con.POSTER_VIEWBOX_HEIGHT, 10);
                        layer[con.FIGURAS_MATEMATICAS_LAYER] = {
                            "img" : figura, 
                            "x": x, 
                            "y": y,
                            'rotation': rotationAngle,
                            "coin": coin
                        }
                    } else if(mode == con.CAOS) {
                        
                        let x = getXPosition(con.CAOS_VIEWBOX_WIDTH, 10);
                        let y =  getYPosition(con.CAOS_VIEWBOX_HEIGHT, 10);
                        layer[con.FIGURAS_MATEMATICAS_LAYER] = {
                            "img" : figura, 
                            "x": x, 
                            "y": y,
                            'rotation': rotationAngle,
                            "coin": coin,
                        }
                    }
                } else {
                    layer[con.FIGURAS_MATEMATICAS_LAYER] = null;
                }
                break;
            case con.FIGURAS_BOTANICAS_LAYER:
                if(sourcesIds.length > 0) {
                    let figura = con.CARTAS_BOTANICAS[Math.floor(Math.random()*con.CARTAS_BOTANICAS.length)];
                    let width = randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                    let x = randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                    let y =  randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                    layer[con.FIGURAS_BOTANICAS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": width,
                        "coin": coin
                    }
                } else {
                    layer[con.FIGURAS_BOTANICAS_LAYER] = null;
                }
                break;
            case con.FIGURAS_CODIGOS_LAYER:
                if(sourcesIds.length > 0) {
                    let figura = con.FIGURAS_CODIGOS[Math.floor(Math.random()*con.FIGURAS_CODIGOS.length)];
                    let width = randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                    let x = randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                    let y =  randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                    layer[con.FIGURAS_CODIGOS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": width,
                        "coin": coin
                    }
                } else {
                    layer[con.FIGURAS_CODIGOS_LAYER] = null;
                }
                break;
            case con.FIGURAS_VERSOS_LAYER:
                break;
            case con.FIGURAS_TEXTURAS_LAYER:
                if(sourcesIds.length > 0) {
                    let figura = con.FIGURAS_TEXTURAS[Math.floor(Math.random()*con.FIGURAS_TEXTURAS.length)];
                    let width = randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                    let x = randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                    let y =  randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                    layer[con.FIGURAS_TEXTURAS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": width,
                        "coin": coin
                    }
                } else {
                    layer[con.FIGURAS_TEXTURAS_LAYER] = null;
                }
                break;
            case con.FIGURAS_MALU_LAYER:
                if(sourcesIds.length > 0) {
                    let figura = con.FIGURAS_MALU[Math.floor(Math.random()*con.FIGURAS_MALU.length)];
                    let width = randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                    let x = randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                    let y =  randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                    layer[con.FIGURAS_MALU_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": width,
                        "coin": coin
                    }
                } else {
                    layer[con.FIGURAS_MALU_LAYER] = null;
                }
                break;
            
            default: 
                break;       
        }
        layerState.push(layer);
    }
    return layerState;
}

const mainReducer = (state = innitState, action) => {
    let currentCombinations;
    switch (action.type) {
        case 'SWITCH':
            if(state[con.MODE] === con.CAOS) {
                return {...state, [con.MODE] : con.POSTER}
            } else {
                return {...state, [con.MODE] : con.CAOS}
            }
        case 'NEW_COMPOSITION':
            let layers = newLayer(action.payload, state)
            return {...state, [con.LAYERS] : layers}
        case 'RESET':
            return {...state, [con.COMBINATIONS] : []}
        case 'APPEND':
            currentCombinations = state[con.COMBINATIONS]
            currentCombinations.push(action.payload)
            if(currentCombinations.length > 2) {
                currentCombinations.shift()
            }
            return {...state, [con.COMBINATIONS] : [...currentCombinations]}
        case 'POP':
            currentCombinations = state[con.COMBINATIONS]
            currentCombinations = currentCombinations.filter(function(e) { return e !== action.payload })
            return {...state, [con.COMBINATIONS] : [...currentCombinations]}            
        default:
            return state
    }
}

export default mainReducer