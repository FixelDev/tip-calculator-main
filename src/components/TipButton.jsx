import React from 'react'

function TipButton(props) 
{
    const focusedStyle = {
        backgroundColor: "hsl(172, 67%, 45%)",
        color: "hsl(183, 100%, 15%)"
    }

    return (
        
        <button 
            className='btn'
            name={props.name} 
            onClick={(e) => props.onClick(e)}
            value={props.value}
            style={props.isFocused ? focusedStyle : {}}
        >
            
            {`${props.value}%`}
        
        </button>
    )
}

export default TipButton