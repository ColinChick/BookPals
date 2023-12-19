document.addEventListener('DOMContentLoaded', async () => {
    const playerContainer = document.getElementById('all-players-container');
    const newPlayerFormContainer = document.getElementById('new-player-form');
    
    // Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
    const cohortName = '2309-FTB-ET-WEB-PT';
    // Use the APIURL variable for fetch requests
    const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
    
    /**
     * It fetches all players from the API and returns them
     * @returns An array of objects.
     */
    const fetchAllPlayers = async () => {
        try {
            const response = await fetch(`${APIURL}players`);
            const responseData = await response.json();
    
            if (responseData.success === false || !responseData || !responseData.data || !responseData.data.players) {
                console.error('Uh oh, unsuccessful response:', responseData);
                return []; 
            }
    
            const players = responseData.data.players;
            return players;
        } catch (err) {
            console.error('Uh oh, trouble fetching players!', err);
            return []; 
        }
    };
    
    const fetchSinglePlayer = async (playerId) => {
        try {
            const response = await fetch(`${APIURL}players/${playerId}`);
            const responseData = await response.json();
    
            if (responseData.success === false || !responseData || !responseData.data || !responseData.data.player) {
                console.error(`Uh oh, unsuccessful response for player #${playerId}:`, responseData);
                return null; // Return null or handle the error accordingly
            }
    
            const player = responseData.data.player;
            return player;
        } catch (err) {
            console.error(`Oh no, trouble fetching player #${playerId}!`, err);
            return null; // Return null or handle the error accordingly
        }
    };
    
    const addNewPlayer = async (playerObj) => {
        try {
            const response = await fetch(`${APIURL}players`, {  // Update the endpoint to 'players'
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerObj),
            });
            const newPlayer = await response.json();
            return newPlayer;
        } catch (err) {
            console.error('Oops, something went wrong with adding that player!', err);
        }
    };
    
    const removePlayer = async (playerId) => {
        try {
            const response = await fetch(`${APIURL}players/${playerId}`, {
                method: 'DELETE',
            });
            const responseData = await response.json();
    
            if (responseData.success === false || !responseData || !responseData.data || !responseData.data.player) {
                console.error(`Whoops, trouble removing player #${playerId} from the roster:`, responseData);
                return null;
            }
    
            const removedPlayer = responseData.data.player;
            return removedPlayer;
        } catch (err) {
            console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
            return null; 
        }
    };
    
    /** 
     *  Function to remove a player from the roster
      * @param {number} playerId - The ID of the player to be removed
     */
    
    window.removePlayerFromRoster = async (playerId) => {
        try {
            // Call the removePlayer function
            const removedPlayer = await removePlayer(playerId);
    
            // Optionally, you can do something with the removedPlayer data if needed
    
            // Fetch updated list of players and re-render
            const updatedPlayers = await fetchAllPlayers();
            renderAllPlayers(updatedPlayers);
        } catch (err) {
            console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
        }
    };
    
    window.showPlayerDetails = async (playerId) => {
        try {
            const player = await fetchSinglePlayer(playerId);
            console.log('Player Details:', player);
        } catch (err) {
            console.error('Error fetching player details:', err);
        }
    };
    
    
    
    
    
    
    /**
     * It takes an array of player objects, loops through them, and creates a string of HTML for each
     * player, then adds that string to a larger string of HTML that represents all the players. 
     * 
     * Then it takes that larger string of HTML and adds it to the DOM. 
     * 
     * It also adds event listeners to the buttons in each player card. 
     * 
     * The event listeners are for the "See details" and "Remove from roster" buttons. 
     * 
     * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
     * API to get the details for a single player. 
     * 
     * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
     * the API to remove a player from the roster. 
     * 
     * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
     * @param playerList - an array of player objects
     * @returns the playerContainerHTML variable.
     */
    const renderAllPlayers = (playerList) => {
        try {
            const playerContainer = document.getElementById('all-players-container');
            playerContainer.innerHTML = '';
    
           
            if (Array.isArray(playerList) && playerList[0]?.players) {
                playerList = playerList[0].players; 
            }
    
            playerList.forEach((player) => {
                const playerCard = document.createElement('div');
                playerCard.innerHTML = `
              <h2>${player.name}</h2>
              <<p>${player.age ? `${player.age} years old` : '3 Years Old'}</p>
              <img src="${player.imageUrl}" alt="${player.name}" style="max-width: 100%;">
              <button onclick="showPlayerDetails(${player.id})">See Details</button>
              <button onclick="removePlayerFromRoster(${player.id})">Remove from Roster</button>
              `;
                playerContainer.appendChild(playerCard);
            });
        } catch (err) {
            console.error('Uh oh, trouble rendering players!', err);
        }
    };
    
    
    /**
     * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
     * fetches all players from the database, and renders them to the DOM.
     */
    const renderNewPlayerForm = () => {
        try {
            const newPlayerFormContainer = document.getElementById('new-player-form');
            newPlayerFormContainer.innerHTML = `
                <form id="addPlayerForm">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
    
                    <label for="breed">Breed:</label>
                    <input type="text" id="breed" name="breed" required>
    
                    <label for="status">Status:</label>
                    <select id="status" name="status">
                        <option value="field">Field</option>
                        <option value="bench">Bench</option>
                    </select>
    
                    <label for="imageUrl">Image URL:</label>
                    <input type="text" id="imageUrl" name="imageUrl">
    
                    <button type="submit">Add Player</button>
                </form>
            `;
    
            const addPlayerForm = document.getElementById('addPlayerForm');
            addPlayerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = {
                    name: document.getElementById('name').value,
                    breed: document.getElementById('breed').value,
                    status: document.getElementById('status').value,
                    imageUrl: document.getElementById('imageUrl').value,
                };
                await addNewPlayer(formData);
                const updatedPlayers = await fetchAllPlayers();
                renderAllPlayers(updatedPlayers);
            });
        } catch (err) {
            console.error('Uh oh, trouble rendering the new player form!', err);
        }
    };
    
    const removeButton = document.getElementById('removeButton');
        removeButton.addEventListener('click', async () => {
            const playerId = 14075;
            await removePlayerFromRoster(playerId);
        });
    
    const init = async () => {
        try {
            const players = await fetchAllPlayers();
            renderAllPlayers(players);
    
            renderNewPlayerForm();
        } catch (err) {
            console.error('Uh oh, something went wrong during initialization!', err);
        }
    };
    
    init();
    });