// Different form elements
import { FormGroup,} from "@blueprintjs/core";

/**
 * Element in charge of multiple choice input
 */
 export const MultipleChoiceElement = ({name, value, setValue, values, valueLabels, disabled, inline }) => {


    return (        
                <FormGroup  label={name} inline={inline}>
                    <div className="bp3-html-select">
                        <select className="input-editing" disabled={disabled}
                                        onChange={(ob) => setValue(ob.target.value)}
                                        value={value}>
                                        {
                                            values.map((_, i) => 
                                            <option key={i} value={values[i]}>{valueLabels[i]}</option>)
                                        }
                                        
                        </select>
                        <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
                    </div>
                </FormGroup> 
               
    )
}