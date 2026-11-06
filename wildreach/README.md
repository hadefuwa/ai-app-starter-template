# Wildreach

Wildreach is a block-based browser game served by a local Node.js server. The server stores multiple worlds in a SQLite database under `data/worlds.sqlite`; saves include player position and progression, resources, quests, chopped trees, mined ore, creatures, boats, placed buildings/furniture, and your explored-map snapshots. Unexplored space is hidden by black fog; the field map keeps a frozen record until you return and reveal that area again. Each world ID seeds the procedural forest, so different worlds have different layouts and each world keeps its layout.

## Run

1. Install Node.js 22.5 or newer (npm is included with Node.js).
2. Double-click `Launch Wildreach.bat` in the parent folder. It builds the client, starts the save server, and opens the game in your browser.
3. Keep the Wildreach Server window open while playing. The game autosaves every five seconds and again when you leave the page. Press Ctrl+C in the server window when you are done.

Each world is stored independently. Use the **WORLDS** button in-game to switch worlds or create another one. Back up `data/worlds.sqlite` to keep your saves safe.

This build stores worlds on this computer. It is not exposed to the internet and does not provide online multiplayer.