import imagePaths from './resources/images.json'

// All Constants
 export const windowWidth = window.screen.width;
 export const windowHeight = window.screen.height;

 // Reducers
 export const MODE = 'mode'
 export const LAYERS = 'layers'
 export const COMBINATIONS = 'combinations'
 export const VERSOS = 'versos'

// General
export const ID = "id"
export const VALUE = "value"

// Layout Modes
export const CAOS = "caos"
export const POSTER = "poster" 
export const MODES = [CAOS, POSTER]

// Books
export const BOOK_1 = 1
export const BOOK_2 = 2
export const BOOK_3 = 3
export const BOOK_4 = 4
export const BOOK_5 = 5

// Layer config
export const BACKGROUND_LAYER = 'background'
export const VERSOS_LAYER = 'versos'
export const FRAGMENTOS_BOTANICOS_LAYER = 'fragmento-botanico'
export const FIGURAS_MATEMATICAS_LAYER = 'figuras-matematicas'
export const FIGURAS_BOTANICAS_LAYER = 'figuras-botanicas'
export const FIGURAS_CODIGOS_LAYER = 'figuras-codigos'
export const FIGURAS_VERSOS_LAYER = 'figuras-versos'
export const FIGURAS_TEXTURAS_LAYER = 'figuras-texturas'
export const FIGURAS_MALU_LAYER = 'figuras-malu'


export const LAYERS_BY_ID = {
    [FIGURAS_VERSOS_LAYER]: [1, 2, 3, 5],
    [FIGURAS_TEXTURAS_LAYER]: [1, 2, 3, 5],
    [FRAGMENTOS_BOTANICOS_LAYER]: [3],
    [FIGURAS_BOTANICAS_LAYER]: [3],
    [FIGURAS_CODIGOS_LAYER]: [3],
    [FIGURAS_MATEMATICAS_LAYER]: [4]
}

// Backgrounds
export const BACKGROUNDS = [
    'var(--fondo-1)', 
    'var(--fondo-2)',
    'var(--fondo-3)'
]

// Versos
export const VERSOS_COLORS = [
    'var(--versos-1)', 
    'var(--versos-2)',
    'var(--versos-3)',
    'var(--versos-4)', 
    'var(--versos-5)',
    'var(--versos-6)',
    'var(--versos-7)', 
    'var(--versos-8)',
    'var(--versos-9)',
]

// Fonts
export const FONT_FAMILYS = [
    "FF-Unit-Pro",
    "LiberationSans",
    "OpenSans"
]

export const FONT_WEIGHTS = [
    "bold",
    "regular"
]



export const POSTER_ROTATION_ANGLES = [0, 90, 180, 360]
export const CAOS_ROTATION_ANGLES = [0, 45, 90, 80, 180, 120, 265, 360]

// Fragmentos botanicos
const fragmentos_botanicos = imagePaths['fb'];
const figuras_matematicas = imagePaths['fm'];
const cartas_botanicas = imagePaths['cb'];
const figuras_codigos = imagePaths['fc'];
const figuras_texturas = imagePaths['ft'];
const figuras_versos = imagePaths['fv'];
const figuras_malu = imagePaths['fmalu'];

// Figuras texturas
// [... start index of each book, finish index (non-inclusive)...]
const numTexturas = [1, 8, 18, 25, 31, 37]
const textosTexturasIds = []
for(let i=0; i < numTexturas.length; i++) {
    let array = []
    let start = numTexturas[i]
    let num = numTexturas[i + 1]
    for(let j = start; j < num; j++) {
        let img = figuras_texturas[j]
        array.push(img)
    }
    textosTexturasIds.push(array)
}

// Figuras versos
const numVersos = [1, 23, 48, 68, 91, 102]
const textosVersosIds = []
    for(let i=0; i < numVersos.length; i++) {
        let array = []
        let start = numVersos[i]
        let num = numVersos[i + 1]
        for(let j = start; j < num; j++) {
            let img = figuras_versos[j]
            array.push(img)
        }
        textosVersosIds.push(array)
    }


export const FIGURES = {
    [FIGURAS_TEXTURAS_LAYER] : {
        1 : textosTexturasIds[0],
        2 : textosTexturasIds[1],
        3 : textosTexturasIds[2],
        5 : textosTexturasIds[3],
    },
    [FRAGMENTOS_BOTANICOS_LAYER] : {
        3: fragmentos_botanicos,
    },
    [FIGURAS_BOTANICAS_LAYER] : {
        3 : cartas_botanicas
    },
    [FIGURAS_CODIGOS_LAYER] : {
        3 : figuras_codigos
    },
    [FIGURAS_MATEMATICAS_LAYER] : {
        4: figuras_matematicas
    },
    [FIGURAS_VERSOS_LAYER] : {
        1 : textosVersosIds[0],
        2 : textosVersosIds[1],
        3 : textosVersosIds[2],
        5 : textosVersosIds[3],
    },
    [FIGURAS_MALU_LAYER] : {
        1 : figuras_malu,
    }
}

// exclude = ["fm-60-99-100.png", "fm-62-112-113.png", "fm-61-197-86.png"]

// Poster constants
export const POSTER_VIEWBOX_WIDTH = 100
export const POSTER_VIEWBOX_HEIGHT = 140
export const POSTER_VIEWBOX = `0 0 ${POSTER_VIEWBOX_WIDTH} ${POSTER_VIEWBOX_HEIGHT}`
export const POSTER_TEXT_POSX = 10
export const POSTER_TEXT_POSY = 20

export const CAOS_VIEWBOX_WIDTH = 140
export const CAOS_VIEWBOX_HEIGHT = 100
export const CAOS_VIEWBOX = `0 0 ${CAOS_VIEWBOX_WIDTH} ${CAOS_VIEWBOX_HEIGHT}`

export const SVGPixelWidth = windowHeight * 0.40
export const PosterPixelFactor = SVGPixelWidth / POSTER_VIEWBOX_WIDTH;
export const CaosPixelFactor = SVGPixelWidth / CAOS_VIEWBOX_WIDTH;

// Biliografia
export const BIBLIOGRAPHY_POSTER = 'Descripción lírica: La miscelanea de Mutis'
export const BIBLIOGRAPHY_CAOS = 'Maquina Azarosa: La miscelanea de Mutis'