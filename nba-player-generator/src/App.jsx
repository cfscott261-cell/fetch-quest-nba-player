import { useState, useEffect } from "react"
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

      const formattedName = encodeURIComponent(randomName)

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

  
  const getImagePath = (name) => {
  return new URL(`./assets/player-pics/${name.toLowerCase().replaceAll(" ", "_")}.jpg`, import.meta.url).href
}

  return (
    <div className="app">
      <div className="card">
        <h1>NBA Player Spotlight</h1>

        {loading && <p>Loading player data...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && player && (
          <>
            {/* 🖼️ Player Image */}
            <img
              src={getImagePath(player.strPlayer)}
              alt={player.strPlayer}
              className="player-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150"
              }}
            />

            <h2>{player.strPlayer}</h2>

            <p>
              <strong>Team:</strong> {player.strTeam || "Not available"}
            </p>

            <p>
              <strong>Nationality:</strong>{" "}
              {player.strNationality || "Not available"}
            </p>

            <p>
              <strong>Sport:</strong> {player.strSport || "Not available"}
            </p>

            <p>
              <strong>Birth Date:</strong>{" "}
              {player.dateBorn || "Not available"}
            </p>
          </>
        )}

        <button onClick={fetchPlayer}>Show Another Player</button>
      </div>
    </div>
  )
}

export default App