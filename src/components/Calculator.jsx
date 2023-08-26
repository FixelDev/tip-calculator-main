import React, {useState, useEffect} from 'react'
import InputField from './InputField'
import ResultField from './ResultField'
import TipButton from './TipButton';
import ResetButton from './ResetButton';
import TipInputField from './TipInputField';
import { nanoid } from 'nanoid'

function Calculator() 
{
    const tipButtonValues = [5, 10, 15,25, 50, 'custom'];

    const[inputsData, setInputsData] = useState({
        "billInput" : '',
        "peopleAmountInput" : '',
        "defaultTip": '',
        "customTip": ''
    })

    const[inputErrors, setInputErrors] = useState({
        "billInput" : '',
        "peopleAmountInput" : '',
    })

    const[tipOptions, setTipOptions] = useState(tipButtonValues.map(value =>{
        return {
            id: nanoid(), 
            value: value,
        }
    }))

    const[tipAmount, setTipAmount] = useState(0);
    const[total, setTotal] = useState(0);

    const[isResetButtonHovered, setIsResetButtonHovered] = useState(false);
    const[isResetButtonActive, setIsResetButtonActive] = useState(false);

    useEffect(() =>
    {
        calculateTipAmount();
        toggleResetButton();

    }, [inputsData]);

    const tipOptionElements = tipOptions.map(tipOption =>
    {
        return (
            tipOption.value === 'custom' 
            
            ?

            <TipInputField 
                name="customTip"
                onChange={onCustomTipSelected}
                value={inputsData.customTip}
                key={tipOption.id}
                isFocused={inputsData.customTip != ''}
            />

            :

            <TipButton 
                name="defaultTip"
                value={tipOption.value}
                onClick={onDefaultTipSelected}   
                key={tipOption.id}
                isFocused={inputsData.defaultTip == tipOption.value}
            /> 
        )       
    })

    function onDefaultTipSelected(e)
    {
        onInputValueChanged(e);
        setInputsData(prevInputsData =>{
            return {...prevInputsData, "customTip" : ''}
        });
    }

    function onCustomTipSelected(e)
    {
        onInputValueChanged(e);
        setInputsData(prevInputsData =>{
            return {...prevInputsData, "defaultTip" : ''}
        });
    }

    function onInputValueChanged(e)
    {
        const{name, value} = e.target;

        setInputsData(prevInputsData => 
        {
            return {
                ...prevInputsData,
                [name] : value
            }
        });

        
    }

    function onInputError(name, errorMsg)
    {
        setInputErrors(prevInputErrors =>{
            return{
                ...prevInputErrors,
                [name]:errorMsg
            }
        })
    }

    function calculateTipAmount(){

        let{billInput, peopleAmountInput, defaultTip, customTip} = inputsData;

        billInput = parseFloat(billInput);
        peopleAmountInput = parseInt(peopleAmountInput);

        if(AreThereErrors(billInput, peopleAmountInput, defaultTip, customTip))
        {
            setTipAmount(0);
            setTotal(0);
            return;
        }

        let tipValue = defaultTip === '' ? customTip : defaultTip;
        tipValue = parseFloat(tipValue);

        const tipPercentage = tipValue / 100;

        setTipAmount(((billInput * tipPercentage) / peopleAmountInput));
        setTotal(((billInput / peopleAmountInput) + (billInput / peopleAmountInput * tipPercentage)));

    }

    function AreThereErrors(billInput, peopleAmountInput, defaultTip, customTip)
    {
        let errorDetected = false;


        if(isNaN(billInput) || isNaN(peopleAmountInput) || (customTip === '' && defaultTip === ''))
            errorDetected = true;


        if(billInput === 0){
            onInputError('billInput', `Can't be zero`);
            errorDetected = true;
        }
        else if(billInput < 0)
        {
            onInputError('billInput', `Can't be negative`);
            errorDetected = true;
        }
        else
            onInputError('billInput', '');

        if(peopleAmountInput === 0){
            onInputError('peopleAmountInput', `Can't be zero`);
            errorDetected = true;
        }
        else if(peopleAmountInput < 0)
        {
            onInputError('peopleAmountInput', `Can't be negative`);
            errorDetected = true;
        }
        else
            onInputError('peopleAmountInput', '');

        return errorDetected;

    }

    function toggleResetButton()
    {
        const{billInput, peopleAmountInput, defaultTip, customTip} = inputsData;        
        const isAnyInputFilled = billInput != '' || peopleAmountInput != '' || (defaultTip != '' || customTip != '');
        
        setIsResetButtonActive(isAnyInputFilled);     
    }
    
    function resetCalculator()
    {
        setInputsData({
            "billInput" : '',
            "peopleAmountInput" : '',
            "defaultTip": '',
            "customTip": ''
        })
    }

    return (
        <div className="calculator flex">
            <div className="calculator-user-input card">
                <InputField
                    name="billInput"
                    title='Bill'
                    icon='icon-dollar.svg'
                    className='bill-input'
                    onChange={onInputValueChanged}
                    value={inputsData.billInput}
                    errorMsg={inputErrors.billInput}
                />   

                <div className="calculator-tip-buttons">
                    <p className="title title-dark">Select Tip %</p>
                    
                    <div className="tip-options-grid">
                        {tipOptionElements}
                    </div>
                </div>

                <InputField
                    name="peopleAmountInput"
                    title='Number of People'
                    icon='icon-person.svg'
                    className="people-amount-input"
                    onChange={onInputValueChanged}
                    value={inputsData.peopleAmountInput}
                    errorMsg={inputErrors.peopleAmountInput}
                />
            </div>
            
            <div className="calculator-result card flex">
                <ResultField
                    title="Tip Amount"
                    value={tipAmount}
                />

                <ResultField
                    title="Total"
                    value={total}
                />

                <ResetButton
                    onMouseEnter={() => setIsResetButtonHovered(true)}
                    onMouseLeave={() => setIsResetButtonHovered(false)}
                    isHovered={isResetButtonHovered}
                    isActive={isResetButtonActive}
                    onClick={resetCalculator}
                />
                
            </div>
        </div>
    );
}

export default Calculator