import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import Winning_Combinations from "./Winning_Combinations";
import GameOver from "./Components/GameOver";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const deriveActivePlayer = (gameTurns) =>{
  let currentPlayer = 'X';
      if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}

const deriveGameBoard = (gameTurns) =>{
  let gameBoard = [...INITIAL_BOARD.map(array => [...array])];

  for (const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const deriveWinner = (gameBoard, players) =>{
  let winner;
  for(const combination of Winning_Combinations){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol &&
       firstSquareSymbol === thirdSquareSymbol)
       {
         winner = players[firstSquareSymbol].toUpperCase();
       }
       
  }
  return winner;
}

let INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length > 8 && !winner ;

  const handleSelectedSquare = (rowIndex, colIndex) =>{
    setGameTurns((prevTurns) =>{
    const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {square:{row: rowIndex, col: colIndex}, player: currentPlayer},
         ...prevTurns
        ];
        return updatedTurns;
    })
  }

  const handlePlayerNameChange = (symbol, newName) =>{
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }

  const handleRematch = () =>{
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" active={activePlayer === 'X'} handlePlayerNameChange={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" active={activePlayer === 'O'} handlePlayerNameChange={handlePlayerNameChange}/>
        </ol>
      {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
      <GameBoard onSelectSquare={handleSelectedSquare} gameBoard={gameBoard}/>
      </div>
      
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
