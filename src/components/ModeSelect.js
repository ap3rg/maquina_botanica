import { useSelector} from "react-redux";
import { translateApplicationParamter } from "../utils/translateFunctions"

import * as con from "./../Constants" 
import { switchMode } from '../store/actions'

export default function ModeSelect() {
    const selectedMode = useSelector(state => state.mainStore.mode)
    return (
        <div className="toggle-switch-container">
            <div className="toggle-switch switch-vertical">
            <input id={con.CAOS} type="radio" name="switch" checked={selectedMode === con.CAOS ? "checked" : null} onChange={() => {switchMode()}}/>
            <label htmlFor={con.CAOS}>{translateApplicationParamter(con.CAOS)}</label>
            <input id={con.POSTER} type="radio" name="switch" checked={selectedMode === con.POSTER ? "checked" : null} onChange={() => {switchMode()}}/>
            <label htmlFor={con.POSTER}>{translateApplicationParamter(con.POSTER)}</label>
            <span className="toggle-outside">
                <span className="toggle-inside"></span>
            </span>
            </div>
        </div>
    )
} 