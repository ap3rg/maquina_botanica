import { useSelector } from 'react-redux';

import * as con from "./../Constants" 
import Poster from '../components/Poster'
import Caos from '../components/Caos'
import * as utils from "../utils/generalFunctions"

import { newComposition, selectBook } from '../store/actions'

const Combinatoria = () => {

    const selectedMode = useSelector(state => state.mainStore.mode);
    const combinations = useSelector(state => state.mainStore.combinations);

    const buildComposition = (combinations) => {
        const layers = []
        layers.push({"id": ['0'], "layer": con.BACKGROUND_LAYER})

        for(let l of Object.keys(con.LAYERS_BY_ID)) {
            let posIds = [];
            let layerIds = con.LAYERS_BY_ID[l]     
            for(let c of combinations){
                if(layerIds.includes(parseInt(c))){
                    posIds.push(c)
                }
            }
            layers.push({"id": posIds, "layer": l})
        }
        layers.push({"id": [combinations[0]], "layer": con.VERSOS_LAYER})
        return layers
    }
    

    const randomComposition = () => {
        let combinations = []     
        for(let i of ['1', '2', '3', '4', '5']) {
            let coin = utils.randNumRange(0, 1) > 0.5 ? true : false
            if(coin) {
                combinations.push(i)
                selectBook(i)
            }
        }
        return combinations
    }
    

    const onClick = () => {
        let randCombination;
        if(combinations.length > 0) {
            randCombination = buildComposition(combinations)
        } else {
            randCombination = randomComposition()
        }
        newComposition(randCombination)
    }

    return (  
        <div className='column-container'> 
            <div> 
                {selectedMode === con.POSTER ? <Poster /> : <Caos /> }
            </div> 
            <div>
                <button 
                    id='combinatoria'
                    className="button-52"
                    onClick={() => onClick()}>
                    Nueva combinatoria
                </button>
            </div>
        </div> 
    )
}

export default Combinatoria