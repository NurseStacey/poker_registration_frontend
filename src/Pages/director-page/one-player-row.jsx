import MyInput from '../../components/widgets/my-input.jsx';
import MyButton from '../../components/widgets/my-button.jsx';
import AxiosInstance from '../../utils/axios.jsx';


export default function OnePlayerRow({
    updatePlayer,
    thisPlayer,
    playerOut,
    gameComplete,
    removePlayer
})
{

    return(
        <div className='one-player-row'>
            <div className='one-player-name'>{thisPlayer.player}</div>
            <div className='one-player-position'>{thisPlayer.place}</div>
            {(gameComplete) ? <></> :
            <>
                <MyInput
                    labelText=''
                    handleChange={e=>updatePlayer(thisPlayer.id,e.target.value)}
                    inputValue={thisPlayer.place}
                    inputName={`${thisPlayer.id}Place`}
                    inputType='number'
                    disable={gameComplete}
                />
                <MyButton
                    button_text='Player Out'
                    button_function={()=>playerOut(thisPlayer.id)}
                    disable={gameComplete}
                />   
                <MyButton
                    button_text='Remove Player'
                    button_function={()=>removePlayer(thisPlayer.id)}
                    disable={gameComplete}
                />                          
            </>
            }

        </div>
    )
}