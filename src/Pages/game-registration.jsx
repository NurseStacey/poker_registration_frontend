import AxiosInstance from '../utils/axios.jsx';
import { useEffect, useState } from 'react';
import MyRadio from '../components/widgets/my-radiobutton.jsx';
import MyInput from '../components/widgets/my-input.jsx';
import MyButton from '../components/widgets/my-button.jsx';

export default function GameRegistration()
{
    const [allGames, setAllGames]=useState([]);
    const [whichGame,setWhichGame]=useState({id:-1});
    const [playerName, setPlayerName]=useState('');

    useEffect(()=>{

        const getGames = async()=>{
            try{

                const response = await AxiosInstance.get(`registration/games-for-registration/`);
                setAllGames(response.data);
                

            }catch(err){
                console.log(err)
            }  
        }
        getGames();
       
    },[]) 
    
   
    const gameSelected=(title)=>{
        console.log(title)
        setWhichGame(allGames.find((oneGame)=>oneGame.button_title===title))
    }

    const signUp=async()=>{

        if(playerName===''){
            alert('Must enter your name');
            return;
        }

        if(whichGame.id===-1){
            alert('Must select a game')
            return;
        }

        try{
            let formData={
                game:whichGame.id,
                player:playerName,
            }
            const response = await AxiosInstance.post(`registration/sign-up/`,formData);
            alert('You have been registered.');
            setPlayerName('');
            setWhichGame({id:-1});

        }catch(err){
            console.log(err)
        }          
    }
    
    return(
        <div>Register for Game
            <MyRadio
                options={allGames.map((oneGame)=>oneGame.button_title)}
                optionsSelected={gameSelected}
                selection={whichGame.button_title}
            />
            <MyInput
                labelText='Player Name'
                handleChange={e=>setPlayerName(e.target.value)}
                inputValue={playerName}
                inputName='player_name'
                inputType='text'
            />     

            <MyButton
                button_function={signUp}
                button_text='Sign Up'

            />                   
        </div>   
    )
}