import {useEffect} from 'react'

export default  function BlankPage()
{

    useEffect(()=>{
        const getVenues = async()=>{
            try{

                const response = await AxiosInstance.get(`registration/venues/`);
                console.log(response.data);

            }catch(err){
                console.log(err)
            }  
        }       
        getVenues();
    },[])
    return(
        <div>This page is blank</div>
    )
}