import { translateApplicationParamter } from "../utils/translateFunctions"
import { useState } from 'react';
import { useSelector} from "react-redux";



const BookButton = ({ id, active, handleClick }) => {
    const cleanName = translateApplicationParamter(id);
   
    return (  
            <button 
                id={id}
                className='button-52'
                style={{backgroundColor: active ? 'var(--active-button)' : 'var(--inactive-button)'}}
                onClick={() => handleClick(id)}>
                {cleanName}
            </button>
    )
}

export default BookButton