
import { useSelector} from "react-redux";

import { selectBook, removeBook } from '../store/actions'
import BookButton from './../components/BookButton';

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
            <div className='row-container'>
            <BookButton id="1" active={combinations.includes("1")} handleClick={handleClick} />
            <BookButton id="2" active={combinations.includes("2")} handleClick={handleClick} />
            <BookButton id="3" active={combinations.includes("3")} handleClick={handleClick} />
            </div>
            <div className='row-container'>
            <BookButton id="4" active={combinations.includes("4")} handleClick={handleClick} />
            <BookButton id="5" active={combinations.includes("5")} handleClick={handleClick} />
            </div>
        </div>
    )
}

export default BookButtons