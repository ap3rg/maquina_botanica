import * as con from "./../../Constants"

import { MultipleChoiceElement } from "../../containers/FormElements"
import { translateApplicationParamter } from "../../utils/translateFunctions"
import { StateApplicationParameterHook } from "../../hooks/ApplicationParamatersHook"




export function ModeSelect(parameters) {

    const [selectedMode, setSelectedMode] = StateApplicationParameterHook(con.SELECTED_MODE)

  return (
      
    <MultipleChoiceElement name="Modo" 
                            value={selectedMode} 
                            setValue={setSelectedMode}
                            values={con.MODES}
                            valueLabels={con.MODES.map(m => translateApplicationParamter(m))}
                            {...parameters}/>
  )
}

