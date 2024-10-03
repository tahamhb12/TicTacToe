import { useEffect, useState } from "react";
import Cell from "./Cell";
import Winner from "./winner/winnerDeclaration";
import { AnimatePresence } from "framer-motion";

const App= () => {

  const defaultValues = ["","","","","","","","",""];
  const [cells , setcells] = useState(defaultValues)
  const [turn,setturn] = useState("circle")
  const [player1_score,setplayer1_score] = useState(parseInt(localStorage.getItem("player1_score")) || 0)
  const [player2_score,setplayer2_score] = useState(parseInt(localStorage.getItem("player2_score"))|| 0)

  const [help,sethelp] = useState(false);
  const [start,setstart] = useState(false)
  const [winner,setwinner] = useState("")
  const [mode,setmode] = useState("dark")

  const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
if(winner){
  setTimeout(() => {
    setwinner(false)
  }, 2000);
}


  useEffect(()=>{
if(start){

  winningCombos.forEach((combo)=>{
    const CircleWins = combo.every(cell=>cells[cell] === "circle")
    const CrossWins = combo.every(cell=>cells[cell] === "cross")
    const Draw = cells.every(cell => cell !== "");

    if(CircleWins){
      setTimeout(() => {
        setwinner("Player 2")
        setcells(defaultValues)  
        setplayer2_score((prevScore)=>{
          const newScore = prevScore + 1
          localStorage.setItem('player2_score', newScore);
          return newScore
        })
      }, 200);
    }else if(CrossWins){ 
      setTimeout(() => {
        setwinner("Player 1")
        setcells(defaultValues)     
        setplayer1_score(prevScore=>{
          const newScore = prevScore + 1
          localStorage.setItem('player1_score', newScore);
          return newScore;
        })
      }, 200); 
    }else if(Draw && !CrossWins && !CircleWins){
      setTimeout(() => {
        alert("draw")
        setcells(defaultValues)     
      }, 200);       }
    })
}

/*     let circles = []
    const crosses = []

    cells.forEach((cell,index)=>{
      if(cell == "circle" && circles.length<3){
        circles.push(index)
      }
    })
    if(circles.length==3 && turn=="circle"){
      cells[circles[0]] = ""
    }

    cells.forEach((cell,index)=>{
      if(cell == "cross" ){
        crosses.push(index)
      }
    })
    if(crosses.length==3 && turn=="cross"){
      cells[crosses[0]] = ""
    } */
  },[cells])

  

  const Reset = () => {

    setplayer1_score((prevScore)=>{
      const newScore = 0
      localStorage.setItem("player1_score",newScore)
      return newScore;
    })
    setplayer2_score((prevScore)=>{
      const newScore = 0
      localStorage.setItem("player2_score",newScore)
      return newScore;
    })
    setcells(defaultValues)
  }
  console.log(cells)


  const DarkMode=()=>{
    document.querySelector("body").setAttribute('data-theme','dark')
  }
  const LightMode=()=>{
    document.querySelector("body").setAttribute('data-theme','light')
  }


  const toggleLightMode = () => {
    if (mode == "dark"){
      DarkMode()
      setmode("light")
    }else{
      LightMode()
      setmode("dark")
    }
  }


  return(
  <div className="App">
    <Winner winner={winner}/>
    <div className="header">
      <h1 className="logo">XO</h1>
      <div className="buttons">
        <button onClick={()=>setstart(!start)}>
          {start ?<i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}        
          <p className="tip">{start ? "Pause" : "Start"}</p>
        </button>
        <button onClick={Reset}>
          <i class="fa-solid fa-arrow-rotate-left"></i>
          <p className="tip" style={{width:"120px"}}>Reset Game</p>
          </button>
        <button onClick={toggleLightMode}>
          {mode == "dark" ?<i class="fa-solid fa-moon"></i>: <i class="fa-solid fa-sun"></i>}
            {mode == "light" ? <p style={{width:"120px"}} className="tip">Turnf off lights</p>:<p style={{width:"120px"}} className="tip">Turnf on lights</p>}
        </button>
        <button><i class="fa-solid fa-volume-high"></i></button>
        <button onClick={()=>sethelp(true)}>
          <i class="fa-solid fa-question"></i>
          <p className="tip">Help</p>
        </button>
        {help && 
        <div className="help">
          <div onClick={()=>sethelp(false)} className="close"><i class="fa-solid fa-x"></i></div>
          <div className="objectives">
            <h2>Objective</h2>
            <ul>
              <li>The game is played by two players.</li>
              <li>The game board consists of a 3x3 grid.</li>
              <li>The objective is to place three of your marks in a row, either horizontally, vertically, or diagonally.</li>
            </ul>
          </div>
          <div className="rules">
            <h2>Rules</h2>
            <ul>
              <li>Each player has only 3 marks (X or O) they can use</li>
              <li>In the first 3 turns, each player places their marks on any empty cell.</li>
              <li>Once all 3 marks are placed, players take turns moving one of their existing marks to any empty cell on the board.</li>
              <li>Players can only move one mark per turn.</li>
              <li>Players cannot place a mark in the same cell twice in a row.</li>
            </ul>
          </div>
        </div>}
      </div>
    </div>
    <div className="cells">
      {cells.map((a,index)=>(
        <Cell start={start} cells={cells} setcells={setcells} turn={turn} setturn={setturn} id={index} key={index}/>
      ))}
    </div>
    <div className="scoreboard">
      <div className="player1">
        <div>X</div>
        <h2>Player 1</h2>
      </div>
      <div className="score">
        <p>{player1_score}</p>
        <div>vs</div>
        <p>{player2_score}</p>
      </div>
      <div className="player2">
        <h2>Player 2</h2>
        <div>O</div>
      </div>
    </div>
  </div>
)}
export default App;