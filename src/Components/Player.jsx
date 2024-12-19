import React,{useState} from 'react';

const Player = ({name, symbol, active, handlePlayerNameChange}) => {
    const [isEditing,setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    const handleEditClick = () =>{
      setIsEditing(wasEditing => !wasEditing);
      if(isEditing){
        handlePlayerNameChange(symbol, playerName);
      }
      
    }
  return (
    <li className={active ? 'active' : undefined}>
          <span className= "player">
            {
                isEditing ? (
                        <>
                        <input type='text' value={playerName} onChange={(e) => setPlayerName(e.target.value)} required/>
                        </>
                    ) : 
                    
                    (
                        <>
                        <span className="player-name">{playerName}</span>
                        <span className="player-symbol">{symbol}</span>
                        </>
                    )

            }
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
          </span>
    </li>
  )
}

export default Player
