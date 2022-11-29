import * as con from "../../Constants"
import * as utils from "../../utils/generalFunctions"
import versosJson from "../../resources/versos.json"

const innitState = {
    [con.MODE]: con.CAOS,
    [con.COMBINATIONS]: [],
    [con.LAYERS]: [],
    [con.VERSOS]: versosJson.data,
}

const newLayer = (layers, state) => {
    // Receives a list of layer_names and returns a list of 
    // layers with its parameters (e.g. {"background": {"color": "black", "size": "100"}})
    const layerState = [];
    let sourcesIds = state[con.COMBINATIONS].map((i) => {return parseInt(i)});
    let sources = []
    for(let i of sourcesIds) {
        if(i !== null) {
            sources.push(state.versos[i-1].name)
        } 
    }
    let mode = state.mode;

    for (let i = 0; i < layers.length; i++) {

        if (sourcesIds.length === 0) {
            return []
        }

        let l = layers[i]["layer"]
        let posIds = layers[i]["id"]
        let id = posIds.length > 0 ? posIds[Math.floor(Math.random()*posIds.length)] : null
        if (!id) {
            continue;
        }

        id = parseInt(id)
        let layer = {}
        let coin = utils.randNumRange(0, 1) > 0.5 ? true : false
        let figuras;
        let figura;
        let x;
        let y;
        let width;

        switch(l) {
            case con.BACKGROUND_LAYER:
                let backgroundColor = con.BACKGROUNDS[Math.floor(Math.random()*con.BACKGROUNDS.length)];
                layer[con.BACKGROUND_LAYER] = {"color" : backgroundColor}

                break;
            case con.VERSOS_LAYER:
                let text1;
                let text2;
                if(sourcesIds.length > 1) {
                    let textoId1 = sourcesIds[0];
                    let textoId2 = sourcesIds[1];

                    // Add text
                    let textArray1 = state[con.VERSOS][textoId1 - 1].versos // one more than array index
                    text1 = textArray1[Math.floor(Math.random()*textArray1.length)]

                    let textArray2 = state[con.VERSOS][textoId2 - 1].versos // one more than array index
                    text2 = textArray2[Math.floor(Math.random()*textArray2.length)]

                } else {
                    let textoId1 = sourcesIds[Math.floor(Math.random()*sourcesIds.length)];
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
                let fontSize;
                if (state.mode === con.POSTER) {
                    textWidth = utils.randNumRange(con.POSTER_VIEWBOX_WIDTH / 3, con.POSTER_VIEWBOX_WIDTH)
                    x = con.POSTER_TEXT_POSX;
                    y = con.POSTER_TEXT_POSY;
                    fontSize = 0;

                } else if (state.mode === con.CAOS) {
                    textWidth = utils.randNumRange(con.CAOS_VIEWBOX_WIDTH / 3, con.CAOS_VIEWBOX_WIDTH)
                    x = utils.randNumRange(5, (con.CAOS_VIEWBOX_WIDTH - textWidth));
                    y = utils.randNumRange(5, con.CAOS_VIEWBOX_HEIGHT / 2);
                    fontSize = utils.randNumRange(2, 10);
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
                break;
                
            case con.FRAGMENTOS_BOTANICOS_LAYER:
                figuras = con.FIGURES[con.FRAGMENTOS_BOTANICOS_LAYER][id]
                figura = figuras[Math.floor(Math.random()*figuras.length)];

                // Position
                if(mode === con.POSTER){
                    x = utils.getXPosition(con.POSTER_VIEWBOX_WIDTH, 4);
                    y =  utils.getYPosition(con.POSTER_VIEWBOX_HEIGHT, 4);
                    layer[con.FRAGMENTOS_BOTANICOS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": (3 * con.POSTER_VIEWBOX_WIDTH / 7),
                        "coin": coin
                    }
                } else if(mode === con.CAOS) {
                    x = utils.getXPosition(con.CAOS_VIEWBOX_WIDTH, 4);
                    y =  utils.getYPosition(con.CAOS_VIEWBOX_HEIGHT, 4);
                    layer[con.FRAGMENTOS_BOTANICOS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": utils.randNumRange(con.POSTER_VIEWBOX_WIDTH / 6, (5 * con.POSTER_VIEWBOX_WIDTH / 6)),
                        "coin": coin
                    }
                }
                break;
            case con.FIGURAS_MATEMATICAS_LAYER:
                let rotationAngle;
                if (state.mode === con.POSTER) {
                    rotationAngle = con.POSTER_ROTATION_ANGLES[Math.floor(Math.random()*con.POSTER_ROTATION_ANGLES.length)];
                } else if(state.mode === con.CAOS) {
                    rotationAngle = con.CAOS_ROTATION_ANGLES[Math.floor(Math.random()*con.CAOS_ROTATION_ANGLES.length)];
                }

                figuras = con.FIGURES[con.FIGURAS_MATEMATICAS_LAYER][id]
                figura = figuras[Math.floor(Math.random()*figuras.length)];
                // Position
                if(mode === con.POSTER){
                    x = utils.getXPosition(con.POSTER_VIEWBOX_WIDTH, 10);
                    y =  utils.getYPosition(con.POSTER_VIEWBOX_HEIGHT, 10);
                    layer[con.FIGURAS_MATEMATICAS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        'rotation': rotationAngle,
                        "coin": coin
                    }
                } else if(mode === con.CAOS) {
                    
                    x = utils.getXPosition(con.CAOS_VIEWBOX_WIDTH, 10);
                    y =  utils.getYPosition(con.CAOS_VIEWBOX_HEIGHT, 10);
                    layer[con.FIGURAS_MATEMATICAS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        'rotation': rotationAngle,
                        "coin": coin,
                    }
                }
                break;
            case con.FIGURAS_BOTANICAS_LAYER:
                // Position
                figuras = con.FIGURES[con.FIGURAS_BOTANICAS_LAYER][id]
                figura = figuras[Math.floor(Math.random()*figuras.length)];
                if(mode === con.POSTER){
                    width = utils.randNumRange(con.POSTER_VIEWBOX_WIDTH / 10, (4 * con.POSTER_VIEWBOX_WIDTH / 10));
                    x = utils.randNumRange(10, con.POSTER_VIEWBOX_WIDTH - width);
                    y =  utils.randNumRange(10, con.POSTER_VIEWBOX_HEIGHT - (2*width));
                    layer[con.FIGURAS_BOTANICAS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": width,
                        "coin": coin
                        }
                } else if(mode === con.CAOS) {
                    width = utils.randNumRange(con.CAOS_VIEWBOX_WIDTH / 10, (4 * con.CAOS_VIEWBOX_WIDTH / 10));
                    x = utils.randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                    y =  utils.randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                    layer[con.FIGURAS_BOTANICAS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": width,
                        "coin": coin
                    }
                }
                break;
            case con.FIGURAS_CODIGOS_LAYER:
                figuras = con.FIGURES[con.FIGURAS_CODIGOS_LAYER][id]
                figura = figuras[Math.floor(Math.random()*figuras.length)];

                width = utils.randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                x = utils.randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                y =  utils.randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                layer[con.FIGURAS_CODIGOS_LAYER] = {
                    "img" : figura, 
                    "x": x, 
                    "y": y,
                    "width": width,
                    "coin": coin
                }
                break;
            case con.FIGURAS_VERSOS_LAYER:
                figuras = con.FIGURES[con.FIGURAS_VERSOS_LAYER][id]
                figura = figuras[Math.floor(Math.random()*figuras.length)];

                width = utils.randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                x = utils.randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                y =  utils.randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                layer[con.FIGURAS_VERSOS_LAYER] = {
                    "img" : figura, 
                    "x": x, 
                    "y": y,
                    "width": width,
                    "coin": coin
                }
                break;
            case con.FIGURAS_TEXTURAS_LAYER:
                    figuras = con.FIGURES[con.FIGURAS_TEXTURAS_LAYER][id]
                    figura = figuras[Math.floor(Math.random()*figuras.length)];

                    width = utils.randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                    x = utils.randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                    y =  utils.randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                    layer[con.FIGURAS_TEXTURAS_LAYER] = {
                        "img" : figura, 
                        "x": x, 
                        "y": y,
                        "width": width,
                        "coin": coin
                    }

                break;
            case con.FIGURAS_MALU_LAYER:
                figuras = con.FIGURAS_MALU[id]
                figura = figuras[Math.floor(Math.random()*figuras.length)];

                width = utils.randNumRange(con.CAOS_VIEWBOX_WIDTH / 12, (4 * con.CAOS_VIEWBOX_WIDTH / 12));
                x = utils.randNumRange(10, con.CAOS_VIEWBOX_WIDTH - width);
                y =  utils.randNumRange(10, con.CAOS_VIEWBOX_HEIGHT - (2*width));
                layer[con.FIGURAS_MALU_LAYER] = {
                    "img" : figura, 
                    "x": x, 
                    "y": y,
                    "width": width,
                    "coin": coin
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
            const layers = []
            if(state.combinations.length > 0) {
                layers.push({"id": ['0'], "layer": con.BACKGROUND_LAYER})
        
                for(let l of Object.keys(con.LAYERS_BY_ID)) {
                    let posIds = [];
                    let layerIds = con.LAYERS_BY_ID[l]     
                    for(let c of state.combinations){
                        if(layerIds.includes(parseInt(c))){
                            posIds.push(c)
                        }
                    }
                    layers.push({"id": posIds, "layer": l})
                }
                layers.push({"id": [state.combinations[0]], "layer": con.VERSOS_LAYER})
            } 
            let finalLayers = newLayer(layers, state)
            return {...state, [con.LAYERS] : finalLayers}
        case 'RESET':
            return {...state, [con.COMBINATIONS] : []}
        case 'APPEND':
            currentCombinations = state[con.COMBINATIONS]
            currentCombinations.push(action.payload)

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