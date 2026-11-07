import AxiosInstance from '../../utils/axios.jsx';
import { useEffect, useState } from 'react';
import MyRadio from '../../components/widgets/my-radiobutton.jsx';
import MyInput from '../../components/widgets/my-input.jsx';
import MyButton from '../../components/widgets/my-button.jsx';

import OnePlayerRow from './one-player-row.jsx';

export default function DirectorPage()
{
    const [whichVenue, setWhichVenue]=useState({id:-1})
    const [allVenues, setAllVenues]=useState([]);
    const [whatDate, setWhatDate]=useState('');
    const [whatTime, setWhatTime]=useState('');
    const [title, setTitle]=useState('');
    const [allGames, setAllGames]=useState([]);
    const [whichGame, setWhichGame]=useState({id:-1});
    const [roster, setRoster]=useState([]);
    const [gameComplete, setGameCompleted]=useState(false);

    useEffect(()=>{

        const getVenues = async()=>{
            try{

                const response = await AxiosInstance.get(`registration/venues/`);
                setAllVenues(response.data);

            }catch(err){
                console.log(err)
            }  
        }

     
        getVenues();
        getGames();
       
    },[])


    const getGames = async()=>{
        try{

            const response = await AxiosInstance.get(`registration/games/`);
            setAllGames(response.data);

        }catch(err){
            console.log(err)
        }  
    }      

    const venueSelected=(venue_name)=>{
        setWhichVenue(allVenues.find((oneVenue)=>oneVenue.venue_name===venue_name))
    }


    const addEvent=async()=>{

        if (whichVenue.id===-1) {
            alert('Must Select a venue');
            return;
        }

        if (whatDate===''){
            alert('Must enter a date');
            return;
        }

        if (title===''){
            alert('Must enter a title');
            return;
        }
        try{
            let formData={
                venue:whichVenue.id,
                event_date:whatDate,
                event_time:whatTime,
                event_title:title
            }

            const response = await AxiosInstance.post(`registration/games/`,formData); 
            alert('Game has been added.');
            getGames();
        }catch(err){
            alert('Problem adding event');
            console.log(err);
        }
    }

    const gameSelected=async(button_title)=>{
        let thisGame=allGames.find((oneGame)=>oneGame.button_title===button_title)
        setGameCompleted(thisGame.completed)
        setWhichGame(thisGame)
    }

    const getRoster=async()=>{
        try{
            const response = await AxiosInstance.get(`registration/get-roster/${whichGame.id}`); 
            setRoster(response.data)
            console.log(response.data)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if (whichGame.id===-1) return

        getRoster();
        
    },[whichGame])


    const saveRosterData =async ()=>{
        if (whichGame.id===-1) return
        try{
            console.log(roster)
            const response = await AxiosInstance.post(`registration/update-roster/`,{roster:roster}); 
            console.log(response.data)
            getRoster();
        }catch(err){
            console.log(err);
        }        
    }

    const removePlayer=async(id)=>{
        try{
            const response = await AxiosInstance.post(`registration/remove-player/${id}`);
            saveRosterData();
            getRoster();
        }catch(err){
            console.log(err)
        }  
    }

    const playerOut = (id)=>{
        console.log(roster.map((onePlayer)=>onePlayer.place))
        let nextPlace = Math.max(...roster.map((onePlayer)=>onePlayer.place))+1
        updatePlayerPlace(id,  nextPlace)
    }

    const setRosterCompleted = async()=>{
        if (whichGame.id===-1) return

        saveRosterData();
        try{
            const response = await AxiosInstance.post(`registration/game-complete/${whichGame.id}/`);
            saveRosterData();
            getGames();
            setWhichGame({id:-1});
            setRoster([]);
        }catch(err){
            console.log(err)
        }          
    }
    const test=()=>{console.log(Roster)}

    const updatePlayerPlace=(id,place)=>{

        let this_player=roster.find((onePlayer)=>onePlayer.id===id)

        let newPlayerElement={
            id:id,
            player:this_player.player,
            place:Number(place),
            game:this_player.game
        } 
        
        setRoster([...roster.filter((onePlayer)=>onePlayer.id!==id),newPlayerElement].sort((a,b)=>a.player.localeCompare(b.player)))
    }

    return(
        <div>
            <div>Director Page</div>
            {/* <button onClick={test}>test</button> */}
            <div>
                <div> Create New Game</div>
                <MyRadio
                    options={allVenues.map((oneVenue)=>oneVenue.venue_name)}
                    optionsSelected={venueSelected}
                    selection={whichVenue.venue_name}
                />
                <MyInput
                    labelText='Title'
                    handleChange={e=>setTitle(e.target.value)}
                    inputValue={title}
                    inputName='title'
                    inputType='text'
                />

                <MyInput
                    labelText='Date'
                    handleChange={e=>setWhatDate(e.target.value)}
                    inputValue={whatDate}
                    inputName='whatDate'
                    inputType='date'
                />            
                <MyInput
                    labelText='Time'
                    handleChange={e=>setWhatTime(e.target.value)}
                    inputValue={whatTime}
                    inputName='whatTime'
                    inputType='text'
                />   

                <MyButton
                    button_function={addEvent}
                    button_text='Add Event'

                />
            </div>
            <div>
                <div>Roster Management</div>
                <div>Select Game</div>
  

                <MyRadio
                    options={allGames.map((oneGame)=>oneGame.button_title)}
                    optionsSelected={gameSelected}
                    selection={whichGame.button_title}
                />
                <div style={{display:'flex', justifyContent:'flex-start'}}>
                    <MyButton
                        button_text='Save Data'
                        button_function={saveRosterData}
                        disable={gameComplete}
                    />
                    <MyButton
                        button_text='Game Completed'
                        disable={gameComplete}
                        button_function={setRosterCompleted}
                    />       
                </div>
               {roster.map((onePlayer)=>(
                <div key={onePlayer.id}>
                    <OnePlayerRow
                        thisPlayer={onePlayer}
                        updatePlayer={updatePlayerPlace}
                        playerOut={playerOut}
                        gameComplete={gameComplete}
                        removePlayer={removePlayer}
                    />
                </div>
               ))}
            </div>

        </div>
    )
}