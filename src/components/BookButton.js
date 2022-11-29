
const BookButton = ({ id, active, handleClick, backgorundImg }) => {
   
    return (  
            <button 
                id={id}
                className='bookButton'
                // style={{backgroundColor: active ? 'var(--active-button)' : 'var(--inactive-button)'}}
                style={{
                    backgroundImage: `url(${backgorundImg})`,    
                    opacity: active ? 1 : 0.3,
                    border: active ? 'var(--button-border)' : ''
                }}
                onClick={() => handleClick(id)}>
            </button>
    )
}

export default BookButton