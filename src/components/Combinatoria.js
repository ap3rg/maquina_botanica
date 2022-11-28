import { useSelector } from 'react-redux';

import * as con from "./../Constants" 
import Poster from '../components/Poster'
import Caos from '../components/Caos'
import { newComposition } from '../store/actions'

const Combinatoria = () => {

    const selectedMode = useSelector(state => state.mainStore.mode);

    const onClick = () => {
        if (selectedMode === con.POSTER) {
            newComposition([
                con.BACKGROUND_LAYER,
                con.FRAGMENTOS_BOTANICOS_LAYER,
                con.FIGURAS_MATEMATICAS_LAYER,
                con.VERSOS_LAYER])
        } else if (selectedMode === con.CAOS) {
            newComposition([
                con.BACKGROUND_LAYER,
                con.FRAGMENTOS_BOTANICOS_LAYER,
                con.FIGURAS_MATEMATICAS_LAYER,
                con.FIGURAS_TEXTURAS_LAYER,
                con.FIGURAS_BOTANICAS_LAYER,
                con.FIGURAS_CODIGOS_LAYER,
                con.FIGURAS_MALU_LAYER,
                con.VERSOS_LAYER])
        }
    }

    return (  
        <div> 
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