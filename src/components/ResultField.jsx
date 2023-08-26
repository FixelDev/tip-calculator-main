import React from 'react'

function ResultField(props) 
{
    return (
        <div className="result-field flex">
            <p className="title title-light">{props.title} <br /> <span className='title-person'>/ person</span></p>
            <p className="result-value">{`$${props.value.toFixed(2)}`}</p>
        </div>
    )
}

export default ResultField