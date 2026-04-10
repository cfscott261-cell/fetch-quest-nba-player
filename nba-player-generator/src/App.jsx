import { useState, useEffect} from "react"
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

  const fetchPlayer = async () => {
    try {
      setLoading(true)
      setError("")

      const randomName =
        playerNames[Math.floor(Math.random() * playerNames.length)]

      const formattedName = randomName.replaceAll(" ", "_")

      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${formattedName}`
      )

      const data = await response.json()

      if (!data.player || data.player.length === 0) {
        throw new Error("No player found")
      }

      setPlayer(data.player[0])
    } catch (err) {
      setError("Could not load player data.")
      setPlayer(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayer()
  }, [])

  return (
    <div>
      <h1>NBA Player Spotlight</h1>
      <p>App is loading player data...</p>
    </div>
  )
}

export default App