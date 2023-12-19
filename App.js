import { createContext, useState } from "react"
import "./App.css"
import Board from "./Pages/Board/Board"
import Home from "./Pages/Home/Home"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from "react"

export const gameContext = createContext()

function App() {

  const [game_param, setGameParam] = useState(() => {

    // Use the 'localStorage' to retrieve 'game_state' data
    let localData = localStorage.getItem('game_state')

    // If data exists, parse it from JSON, otherwise set default values
    return localData? JSON.parse(localData) : {theme:'Numbers', plyrs_nums: 1, grid:'4x4'}
  })

  // Use 'useEffect' to save 'game_param' to 'localStorage' whenever it changes
  useEffect(() => {
    localStorage.setItem('game_state', JSON.stringify(game_param))
  }, [game_param])
  
  return (
    <Router>
      <div className="container" >
      <gameContext.Provider value = {{game_param, setGameParam}}>
        <Routes>
        {/* bodyBg={setBody} */}
            <Route path='/' element={<Home ></Home>} />
            <Route path='/game' element={<Board />} />
        </Routes>
      </gameContext.Provider>
      </div>
    </Router>
  )
}

export default App