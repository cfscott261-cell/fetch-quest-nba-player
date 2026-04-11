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

  const playerImageMap = {
    "Allen Iverson": new URL("./assets/player-pics/allen_iverson.jpg", import.meta.url).href,
    "Chris Paul": new URL("./assets/player-pics/chris_paul.jpg", import.meta.url).href,
    "Derrick Rose": new URL("./assets/player-pics/derrick_rose.jpg", import.meta.url).href,
    "Dirk Nowitzki": new URL("./assets/player-pics/dirk_nowitzki.jpg", import.meta.url).href,
    "Grant Hill": new URL("./assets/player-pics/grant_hill.jpg", import.meta.url).href,
    "Kawhi Leonard": new URL("./assets/player-pics/kawhi_leonard.jpg", import.meta.url).href,
    "Kevin Durant": new URL("./assets/player-pics/kevin_durant.jpg", import.meta.url).href,
    "Kevin Garnett": new URL("./assets/player-pics/kevin_garnett.jpg", import.meta.url).href,
    "Kobe Bryant": new URL("./assets/player-pics/kobe_bryant.jpg", import.meta.url).href,
    "Larry Bird": new URL("./assets/player-pics/larry_bird.jpg", import.meta.url).href,
    "LeBron James": new URL("./assets/player-pics/lebron_james.jpg", import.meta.url).href,
    "Magic Johnson": new URL("./assets/player-pics/magic_johnson.jpg", import.meta.url).href,
    "Penny Hardaway": new URL("./assets/player-pics/penny_hardaway.jpg", import.meta.url).href,
    "Shaquille O'Neal": new URL("./assets/player-pics/shaq_oneal.jpg", import.meta.url).href,
    "Stephen Curry": new URL("./assets/player-pics/steph_curry.jpg", import.meta.url).href,
    "Tim Duncan": new URL("./assets/player-pics/tim_duncan.jpg", import.meta.url).href,
    "Tracy McGrady": new URL("./assets/player-pics/tracy_mcgrady.jpg", import.meta.url).href,
  }

  const playerDetails = {
    "Michael Jordan": { hometown: "Brooklyn, New York", championships: 6 },
    "LeBron James": { hometown: "Akron, Ohio", championships: 4 },
    "Kobe Bryant": { hometown: "Philadelphia, Pennsylvania", championships: 5 },
    "Shaquille O'Neal": { hometown: "Newark, New Jersey", championships: 4 },
    "Magic Johnson": { hometown: "Lansing, Michigan", championships: 5 },
    "Larry Bird": { hometown: "West Baden Springs, Indiana", championships: 3 },
    "Tim Duncan": { hometown: "Saint Croix, U.S. Virgin Islands", championships: 5 },
    "Allen Iverson": { hometown: "Hampton, Virginia", championships: 0 },
    "Penny Hardaway": { hometown: "Memphis, Tennessee", championships: 0 },
    "Kevin Durant": { hometown: "Washington, D.C.", championships: 2 },
    "Stephen Curry": { hometown: "Charlotte, North Carolina", championships: 4 },
    "Kawhi Leonard": { hometown: "Los Angeles, California", championships: 2 },
    "Kevin Garnett": { hometown: "Greenville, South Carolina", championships: 1 },
    "Grant Hill": { hometown: "Dallas, Texas", championships: 0 },
    "Tracy McGrady": { hometown: "Bartow, Florida", championships: 0 },
    "Dirk Nowitzki": { hometown: "Würzburg, Germany", championships: 1 },
    "Chris Paul": { hometown: "Winston-Salem, North Carolina", championships: 0 },
    "Derrick Rose": { hometown: "Chicago, Illinois", championships: 0 }
  }

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

  return (
    <div className="app">
      <div className="card">
        <h1>NBA Player Spotlight</h1>

        {loading && <p>Loading player data...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && player && (
          <>
            <img
              src={playerImageMap[player.strPlayer]}
              alt={player.strPlayer}
              className="player-img"
            />

            <h2>{player.strPlayer}</h2>

            <p><strong>Team:</strong> {player.strTeam || "Not available"}</p>
            <p><strong>Position:</strong> {player.strPosition || "Not available"}</p>
            <p><strong>Hometown:</strong> {playerDetails[player.strPlayer]?.hometown || "Not available"}</p>
            <p><strong>Championships:</strong> {playerDetails[player.strPlayer]?.championships ?? "Not available"}</p>
          </>
        )}

        <button onClick={fetchPlayer}>Show Another Player</button>
      </div>
    </div>
  )
}

export default App