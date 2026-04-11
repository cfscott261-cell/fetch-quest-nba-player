# NBA Player Spotlight

## Description
NBA Player Spotlight is a React application that fetches player data from a public API and displays key information such as team, position, hometown, and championships. Users can click a button to generate a new random player.

## API Used
TheSportsDB API  
https://www.thesportsdb.com/api.php

## How to Run Locally
1. Clone the repository
2. Navigate to the project folder
3. Run `npm install`
4. Run `npm run dev`
5. Open the local development link in your browser

## Technical Challenge
One challenge I encountered was matching API player names with local image files. To fix this I created a mapping between player names and image paths to make sure the correct images displayed for each player. I also had some trouble displaying stats and team since some of my players are retired.