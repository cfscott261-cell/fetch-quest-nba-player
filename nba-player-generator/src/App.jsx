import { useState} from "react"
import "./App.css"

function App() {

  const playerNames = [
    "Michael Jordan",
    "LeBron James",
    "Kobe Bryant",
    "Shaquille O'Neal",
    "Magic Johnson",
    "Larry Bird",
    "Tim Duncan",
    "Allen Iverson",
    "Penny Hardaway",
    "Kevin Durant",
    "Stephen Curry",
    "Kawhi Leonard",
    "Kevin Garnett",
    "Grant Hill",
    "Tracy McGrady",
    "Dirk Nowitzki",
    "Chris Paul",
    "Derrick Rose",
    
  ]
const [player, setPlayer] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")


  return (
  <div>
    <h1>NBA Player Spotlight</h1>
    <p>Total players: {playerNames.length}</p>
  </div>
)
}

export default App