import React from 'react'

function TipInputField(props) {

    const focusedStyle = {
        border: "solid 2px hsl(172, 67%, 45%)"
    }

    return (
        <input 
            type="number" 
            name={props.name}
            onChange={(e) => props.onChange(e)}
            value={props.value}
            placeholder='Custom'
            style={props.isFocused ? focusedStyle : {}}
        />
    )
}

export default TipInputField