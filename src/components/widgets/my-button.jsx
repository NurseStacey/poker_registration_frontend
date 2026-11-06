

export default function MyButton({
    button_function,
    button_text,
    button_style,
    disable
})
{
    const localFunctin=()=>{
        try{  
            if(disable) return

            button_function()

        } catch {button_function()}

    }
    return(
        <div
            onClick={localFunctin}
            className='my_button'

            style={{
                ...button_style,
            }}
            >
                {button_text}
            </div>
    )
}