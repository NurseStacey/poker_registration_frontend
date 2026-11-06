import { useRef } from 'react';

export default function MyInput({
    labelText,
    labelStyle,
    handleChange,
    inputValue,
    inputName,
    inputType,
    inputStyle,
    inputFieldStyle,
    inputKey,
    disable
})
{
    const fileInputRef = useRef(null);

    return (
        <div
            className='my_input'
            style={{
                ...inputStyle
            }}
            >
                
            {(labelText==='')?<></>:
                <label htmlFor={inputName} style={labelStyle}>{labelText}</label>            
            }

            <input
                key={inputKey}
                style={(inputFieldStyle===undefined)?{width:'30%'}:inputFieldStyle}
                disabled={disable}
                id={inputName} 
                ref={fileInputRef}
                name={inputName}
                onChange={handleChange}  
                type={inputType}
                value={inputValue}>                
            </input>
        </div>
    )
}