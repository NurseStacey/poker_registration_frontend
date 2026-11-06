

export default function MyRadio({
    options,
    optionsSelected,
    selection,
    radioStyle,
    disabled,
    oneBoxStyle
})
{

    const optionClicked =(option)=>{
        if (disabled || selection===option) return

        optionsSelected(option)
    }
    return(
        <div
            style={{
                margin:"0 10%",
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                flexWrap:"wrap",
                ...radioStyle
            }}>

            <div
                style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"flex-start",
                    flexWrap:"wrap",
                }}>
                {options.map((oneOption)=>
                    <div
                        key={oneOption}
                        onClick={()=>optionClicked(oneOption)}
                        style={{
                            backgroundColor:(selection===oneOption) ? "#FF5C5C" : "white",
                            border:"1px solid black",
                            margin:"10px",  
                            cursor:"pointer",
                            ...oneBoxStyle 
                        }}>
                            {oneOption}
                    </div>)}                
            </div>                

        </div>
    )
}