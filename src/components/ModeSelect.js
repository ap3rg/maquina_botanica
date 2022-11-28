import { useSelector} from "react-redux";
import { translateApplicationParamter } from "../utils/translateFunctions"

import { switchMode } from '../store/actions'

export default function ModeSelect() {
    const selectedMode = useSelector(state => state.mainStore.mode)
    const cleanName = translateApplicationParamter(selectedMode);
    return (
        <div>
            <button onClick={() => switchMode()}>
            {cleanName}
            </button>
        </div>
    )
} 