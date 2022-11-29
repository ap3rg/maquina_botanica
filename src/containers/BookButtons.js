
import { useSelector} from "react-redux";

import { selectBook, removeBook } from '../store/actions'
import BookButton from './../components/BookButton';

// button images
import button1 from './../resources/buttons/button-1.png'
import button2 from './../resources/buttons/button-2.png'
import button3 from './../resources/buttons/button-3.png'
import button4 from './../resources/buttons/button-4.png'
import button5 from './../resources/buttons/button-5.png'

const BookButtons = () => {

    const combinations = useSelector(state => state.mainStore.combinations)

    const handleClick = (id) => {
        if(combinations.includes(id)) {
            removeBook(id)
        } else {    
            selectBook(id)
        }
    } 

    return (  
        <div>
            <div className='column-container'>
            <BookButton id="1" active={combinations.includes("1")} handleClick={handleClick} backgorundImg={button1}/>
            <BookButton id="2" active={combinations.includes("2")} handleClick={handleClick} backgorundImg={button2}/>
            <BookButton id="3" active={combinations.includes("3")} handleClick={handleClick} backgorundImg={button3}/>
            <BookButton id="4" active={combinations.includes("4")} handleClick={handleClick} backgorundImg={button4}/>
            <BookButton id="5" active={combinations.includes("5")} handleClick={handleClick} backgorundImg={button5}/>
            </div>
        </div>
    )
}

export default BookButtons