import React from 'react'

function InputField(props) {

    const errorStyle = {
        border: "solid 2px #f00"
    }

    return (
        <div className={`input-field ${props.className}`}>
            <div className="input-field-text-group">
                <p className="title title-dark">{props.title}</p>
                <p className="title title-error">{props.errorMsg}</p>
            </div>
            
            <div className="input">
                <img src={`./images/${props.icon}`} className='input-icon' />
                <input 
                    name={props.name}
                    type="number" 
                    value={props.value}
                    placeholder='0'
                    onChange={(e) => props.onChange(e)}        
                    style={props.errorMsg !== '' ? errorStyle : {}}            
                />
            </div>
        </div>
    )
}

export default InputField