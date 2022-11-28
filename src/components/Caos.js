import { useRef } from 'react';
import { useSelector } from 'react-redux';

// d3
import * as d3 from 'd3'

import * as con from "./../Constants"
import d3Builder from '../utils/d3Builder';


const Caos = () => {

    const svgObjRef = useRef()
    const rulerObjRef = useRef()

    const layers = useSelector(state => state.mainStore.layers);
    const mode = useSelector(state => state.mainStore.mode);
    let canvas = d3.select(svgObjRef.current);

    const builder = new d3Builder(canvas, layers, mode)
    builder.cleanCanvas()
    builder.buildComposition()

    return ( 
        <div>
            <span ref={ rulerObjRef }></span>
            <svg
                className='caos'
                viewBox={con.CAOS_VIEWBOX}
                ref={ svgObjRef }>
            </svg>
        </div> 
    )
}

export default Caos
