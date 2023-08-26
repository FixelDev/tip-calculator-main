import React from 'react'

function ResetButton(props) {

    let currentStyle = {};

    const activeStyle = {
        cursor: 'pointer',
        backgroundColor: 'hsl(172, 67%, 45%)',
        color: 'hsl(183, 100%, 15%)'
    }

    const hoverStyle = {
        cursor: 'pointer',
        backgroundColor:  '#95eadf',
        color: 'hsl(183, 100%, 15%)'
    }

    if(props.isActive)
    {
        currentStyle = activeStyle;

        if(props.isHovered)
            currentStyle = hoverStyle;
    }
    else
        currentStyle = {};

    return (
        <button 
            className='btn reset-btn'
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            style={currentStyle}
            onClick={() => {props.isActive && props.onClick()} }
        >
            reset
        </button>
    )
}

export default ResetButton