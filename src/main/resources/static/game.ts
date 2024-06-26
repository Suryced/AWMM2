import { sendMessage, startGame } from "./sendMessage.js";
import { wsManager } from './websocketManager.js';
import { GameMap } from './map.js';
import { Tokens } from './token.js';

const characterNames: {[key: number]: string } = {
    0: "Miss Scarlet",
    1: "Col. Mustard",
    2: "Mrs. White",
    3: "Mr. Green",
    4: "Mrs. Peacock",
    5: "Professor Plum"
}

class Character {
    name: string = "";
    row: number = 0;
    col: number = 0;
    constructor(name: string, row: number, col:number) {
        this.name = name;
        this.row = row;
        this.col = col;
    }
}

var scarlet = new Character("Scarlet", 0, 0);
var mustard = new Character("Mustard", 0, 0);
var white = new Character("White", 0, 0);
var green = new Character("Green", 0, 0);
var peacock = new Character("Peacock", 0, 0);
var plum = new Character("Plum", 0, 0);

const layout = [
    ['Study', 'Hallway', 'Hall', 'Hallway', 'Lounge'],
    ['Hallway', '', 'Hallway', '', 'Hallway'],
    ['Library', 'Hallway', 'BilliardRoom', 'Hallway', 'DiningRoom'],
    ['Hallway', '', 'Hallway', '', 'Hallway'],
    ['Conservatory', 'Hallway', 'Ballroom', 'Hallway', 'Kitchen']
];

<<<<<<< HEAD
=======
const suspectCards: {[key: string]: string } = {
    "Miss Scarlet": "/images/cards/suspects/MissScarlet.png",
    "Col. Mustard": "/images/cards/suspects/ColonelMustard.png",
    "Mrs. White": "/images/cards/suspects/MrsWhite.png",
    "Mr. Green": "/images/cards/suspects/MrGreen.png",
    "Mrs. Peacock": "/images/cards/suspects/MrsPeacock.png",
    "Professor Plum": "/images/cards/suspects/ProfessorPlum.png"
}

const weaponCards:{[key: string]: string } = {
    "Candlestick": "/images/cards/weapons/Candlestick.png",
    "Revolver": "/images/cards/weapons/Revolver.png",
    "Ice Pick": "/images/cards/weapons/Ice_Pick.png",
    "Poison": "/images/cards/weapons/Poison.png",
    "Poker": "/images/cards/weapons/Poker.png",
    "Shears": "/images/cards/weapons/Shears.png"
}

const roomCards:{[key: string]: string } = {
    "Ballroom": "/images/cards/rooms/Ballroom.png",
    "Billiard Room": "/images/cards/rooms/BilliardRoom.png",
    "Conservatory": "/images/cards/rooms/Conservatory.png",
    "Dining Room": "/images/cards/rooms/DiningRoom.png",
    "Hall": "/images/cards/rooms/Hall.png",
    "Kitchen": "/images/cards/rooms/Kitchen.png",
    "Library": "/images/cards/rooms/Library.png",
    "Lounge": "/images/cards/rooms/Lounge.png",
    "Study": "/images/cards/rooms/Study.png",
}

>>>>>>> b393a86ea56cf1c3271e7001086481c88283287d
const roomSize = 200;
const imageNames = ['Study', 'Hall', 'Lounge', 'Library', 'BilliardRoom', 'DiningRoom', 'Conservatory', 'Ballroom', 'Kitchen', 'Hallway'];
const gameMap = new GameMap(layout, imageNames, roomSize);
const charTokens = new Tokens(gameMap.canvas, layout, roomSize);

<<<<<<< HEAD
=======
var turnOrder: number[] = [];
var playerHand: string[] = [];

function addTurns(){
    let turnOrderDiv = document.getElementById("turn-cards")!;
    turnOrderDiv.innerHTML = "";
    turnOrder.forEach((value) => {
        const img = document.createElement("img");
        img.src = suspectCards[characterNames[value]];
        img.width = 100;
        img.alt = characterNames[value];
        turnOrderDiv.appendChild(img);
    });
}
>>>>>>> b393a86ea56cf1c3271e7001086481c88283287d
// Function to get the value of a specific cookie
function getCookieValue(cookieName: string): string | undefined {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(cookieName));
    return cookie ? cookie.split("=")[1] : undefined;
}

function sendLoginMessage(){
    const GAMEID = <string>getCookieValue('gameId');
    const USERID = parseInt(<string>getCookieValue('userId'));
    try {
        wsManager.sendMessage({GAMEID: GAMEID, USERID: USERID, action: "LOGIN"})
    } catch (error) {
        console.error("Error sending login message:", error);
    }
}

function getCharacterFromUserID(userID: number) : Character | null{
    let character : Character;
    switch(userID) {
        case 0: {
            character = scarlet;
            break;
        }
        case 1: {
            character = mustard;
            break;
        }
        case 2: {
            character = white;
            break;
        }
        case 3: {
            character = green;
            break;
        }
        case 4: {
            character = peacock;
            break;
        }
        case 5: {
            character = plum;
            break;
        }
        default: { return null; }
    }
    return character;
}

function getCharacterFromName(name : string) : Character | null {
    let character : Character;
    switch(name) {
        case "Miss Scarlet": {
            character = scarlet;
            break;
        }
        case "Col. Mustard": {
            character = mustard;
            break;
        }
        case "Mrs. White": {
            character = white;
            break;
        }
        case "Mr. Green": {
            character = green;
            break;
        }
        case "Mrs. Peacock": {
            character = peacock;
            break;
        }
        case "Professor Plum": {
            character = plum;
            break;
        }
        default: { return null; }
    }
    return character;
}

function movePlayer(character : Character, x : number, y : number) {
    // Clear previous player position\
    let oldElement = document.querySelector(`#grid tbody tr:nth-child(${character.row + 1}) td:nth-child(${character.col + 1})`);
    if (oldElement !== null) {
        let str = oldElement.textContent;
        if (str !== null) {
            let replacement = str.replace(character.name, "");
            oldElement.textContent = replacement;
        }
    }

    // document.querySelector(`#grid tbody tr:nth-child(${y + 1}) td:nth-child(${x + 1})`).textContent = '';

    // Update player position
    // playerPosition.x += x;
    // playerPosition.y += y;

    // Ensure player stays within grid bounds
    character.row = Math.max(0, Math.min(x, 4));
    character.col = Math.max(0, Math.min(y, 4));

    // move token
    charTokens.updatePostion(character.name, character.row, character.col);
    gameMap.drawMap();
    charTokens.drawTokens();

    // Set new player position
    let newElement = document.querySelector(`#grid tbody tr:nth-child(${character.row + 1}) td:nth-child(${character.col + 1})`);
    // document.querySelector(`#grid tbody tr:nth-child(${y + 1}) td:nth-child(${x + 1})`).textContent = 'X';
    if (newElement !== null) {
        newElement.textContent += character.name + " ";
    }

}

document.addEventListener("DOMContentLoaded", () => {
    wsManager.connect();

    const form = document.getElementById('messageForm') as HTMLFormElement;
    const imageSelection = document.getElementById('image-selection')!;
    const mainContent = document.getElementById('game-controls')!;
    const selectableImages = document.querySelectorAll('.selectable-image')!;
    let selectedImageValue: number | null = null; // Variable to store the selected image value
    const messageBox = document.getElementById("message-box")!;

    const startButton = document.getElementById('startButton') as HTMLInputElement;
    const startButtonContainer = document.getElementById('startButtonContainer');

    const suggestAction = document.getElementById('suggestAction') as HTMLInputElement;
    const accuseAction = document.getElementById('accuseAction') as HTMLInputElement;
    const disproveAction = document.getElementById('disproveAction') as HTMLInputElement;

    const selectOptions = document.getElementById('selectOptions')!;
    const disproveOptions = document.getElementById("disproveOptions")!;


    const suspectSelect = document.getElementById('suspectSelect') as HTMLSelectElement;
    const weaponSelect = document.getElementById('weaponSelect') as HTMLSelectElement;
    const roomSelect = document.getElementById('roomSelect') as HTMLSelectElement;
    const disproveSelect = document.getElementById('disproveSelect') as HTMLSelectElement;

    const suspects = ['Professor Plum', 'Miss Scarlet', 'Col. Mustard', 'Mrs. Peacock', 'Mr. Green', 'Mrs. White'];
    const weapons = ["Candlestick", "Revolver", "Ice Pick", "Poison", "Poker", "Shears"];
    const rooms = ['Study', 'Hall', 'Lounge', 'Kitchen', 'Ballroom', 'Conservatory', 'Dining Room', 'Billiard Room', 'Library'];

    messageBox.innerHTML += 'Game ID: ' + getCookieValue('gameId') + '<br>';

    suspects.forEach(suspects => {
        const option = document.createElement('option');
        option.value = suspects;
        option.textContent = suspects;
        suspectSelect.appendChild(option);
    });

    weapons.forEach(weapon => {
        const option = document.createElement('option');
        option.value = weapon;
        option.textContent = weapon;
        weaponSelect.appendChild(option);
    });

    rooms.forEach(rooms => {
        const option = document.createElement('option');
        option.value = rooms;
        option.textContent = rooms;
        roomSelect.appendChild(option);
    });


    document.querySelectorAll('input[name="actionChoice"]').forEach(input => {
        input.addEventListener('change', function () {
            if (suggestAction.checked || accuseAction.checked) {
                selectOptions.style.display = 'block';
                disproveOptions.style.display = 'none';
            } else if (disproveAction.checked){
                selectOptions.style.display = 'none';
                disproveOptions.style.display = 'block';
            } else {
                selectOptions.style.display = 'none';
                disproveOptions.style.display = 'none';
            }
        })
    });

    // Function to toggle select options based on the checked radio button
    function toggleSelectOptions() {
        if (suggestAction.checked) {
            selectOptions.style.display = 'block';
        } else {
            selectOptions.style.display = 'none';
        }
    }

    startButton.addEventListener("click", async () => {
        try {
            const action = startButton.value;
            const gameID = <string>getCookieValue('gameId');
            const userID = parseInt(<string>getCookieValue('userId'));
            const message = await startGame({ action: action, GAMEID: gameID, USERID: userID });
            console.log('Start game message received:', message);
            startButton.style.display = 'none';
        } catch (error) {
            console.error(`Error starting game: `, error);
            alert(`Failed to start game.`);
        }
    });

    if (startButtonContainer) {
        startButtonContainer.style.display = 'block'; // Safe to access `style` because we checked if it's not null
    } else {
        console.error('Failed to find the startButtonContainer element.');
    }    form.style.display = 'none'; // Initially hide the form

    // Add event listeners to each selectable image
    selectableImages.forEach(image => {
        image.addEventListener('click', () => {
            // Store the selected image value in the variable
            selectedImageValue = parseInt(image.getAttribute('data-image')!);
            document.cookie = `userId=${selectedImageValue}; path=/; max-age=86400`;

            // Send login message with corresponding userid
            sendLoginMessage();

            imageSelection.style.display = 'none'; // Hide the image selection

            var display = document.getElementById('display-name');
            var name = image.getAttribute('alt');
            console.log('display = ' + display + ', name  = ' + name)
            if (name !== null && display !== null)
            {
                console.log("set inner text")
                display.innerHTML = name;
                console.log("inner html = " + display.innerHTML)

            }

        });
    });

    // Set up an event listener for when messages are received
    wsManager.onMessage((event: MessageEvent) => {
        console.log('Message from server:', event.data);
        const message = JSON.parse(event.data)
        // var isEmpty = messageBox.innerHTML === "";
        // if (isEmpty) {
        //     messageBox.innerHTML += 'New Game Created with Game ID: ' + message.GAMEID + '<br>';
        // }
        if (message.type === 'LOGIN') {
            const characterName = characterNames[message.USERID];
            if (message.action !== 'FAIL') {
                console.log(`Login succeeded for ${characterName}`)
                //messageBox.innerHTML = message.action;
                turnOrder.push(parseInt(message.USERID));
                messageBox.innerHTML += `${characterName} has joined the game.<br>`;
            } else {
                alert("Login Failed!")
                console.log(`Login failed for ${characterName}`)
            }
            if (startButtonContainer) {
                startButtonContainer.style.display = 'block'; // Safe to access `style` because we checked if it's not null
            } else {
                console.error('Failed to find the startButtonContainer element.');
            }
        } else if (message.type === 'MOVE') {
            const characterName = characterNames[message.USERID];
            if (message.action === 'SUCCESS') {
                messageBox.innerHTML += `${characterName} has moved to ${message.location}.<br>`;

                let row = message.location.charAt(0);
                let col = message.location.charAt(2);

                let character : Character;

                switch(message.USERID) {
                    case 0: {
                        character = scarlet;
                        break;
                    }
                    case 1: {
                        character = mustard;
                        break;
                    }
                    case 2: {
                        character = white;
                        break;
                    }
                    case 3: {
                        character = green;
                        break;
                    }
                    case 4: {
                        character = peacock;
                        break;
                    }
                    case 5: {
                        character = plum;
                        break;
                    }
                    default: { return; }
                }

                console.log("character = " + character + ", row = " + row + ", col = " + col);
                movePlayer(character, row, col);


            } else {
                console.log(`Move failed for ${characterName}`)
            }

        } else if (message.type === 'start') {
            console.log('Start game message received:', message);
            startButton.style.display = 'none';
            mainContent.style.display = 'block'; // Show the main content
            form.style.display = 'block'; // Show the form
            messageBox.innerHTML = message.action;
<<<<<<< HEAD
=======
            turnOrder.sort();
            console.log(turnOrder);
            addTurns();
>>>>>>> b393a86ea56cf1c3271e7001086481c88283287d
            gameMap.loadImages().then(() => {
                gameMap.drawMap();
            });
        } else if (message.type === 'SUGGEST') {
            if (message.action === 'FAIL') {
                messageBox.innerHTML += `${characterNames[message.USERID]} cannot make suggestion when not in room.<br>`;
            } else {
                messageBox.innerHTML += `${characterNames[message.USERID]} suggests it was ${message.suspect} in the ${message.location} with a ${message.weapon}.<br>`;
                let row = message.action.charAt(0);
                let col = message.action.charAt(2);
                let character = getCharacterFromName(message.suspect);
                if (character !== null) {
                    movePlayer(character, row, col);
                }
            }
        } else if (message.type === 'accusefail') {
            form.style.display = 'none';
        } else if (message.type === 'CARD') {
            let hand = document.getElementById('cards')!;
            const img = document.createElement("img");
            playerHand.push(message.action);
            if (weapons.indexOf(message.action) > -1){
                img.src = weaponCards[message.action];
            } else if ((Object as any).values(characterNames).includes(message.action)){
                img.src = suspectCards[message.action];
            } else {
                img.src = roomCards[message.action];
            }
            img.width = 100;
            hand.appendChild(img);
            disproveSelect.appendChild(message.action);
            // if (hand !== null) {
            //     hand.innerHTML += message.action + ", ";
            // }
        } else if (message.type === 'DISPROVE') {
            if (message.action === 'FAIL') {
                messageBox.innerHTML += `${characterNames[message.USERID]} failed to disprove<br>`;
            } else {
                messageBox.innerHTML += `${characterNames[message.USERID]} disproved<br>`;
            }
        } else if (message.type === 'GAMEOVER') {
            if (message.action === 'Game Won') {
                messageBox.innerHTML += `Game Over! ${characterNames[message.USERID]} won with answers ${message.weapon}, ${message.suspect}, ${message.location}`
            } else {
                messageBox.innerHTML += "Game Over with No Winner :("
            }
<<<<<<< HEAD
        } else if (message.action == 'ENDTURN') {
=======
        } else if (message.type === 'ENDTURN') {
            turnOrder.push(turnOrder.shift()!);
            addTurns();
>>>>>>> b393a86ea56cf1c3271e7001086481c88283287d
            messageBox.innerHTML += `${characterNames[message.USERID]} ends turn.<br>`;
        }
        
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const gameId = <string>getCookieValue('gameId');
        const userId = parseInt(<string>getCookieValue('userId'));
        const actionSelected = document.querySelector<HTMLInputElement>('input[name="actionChoice"]:checked')!;

        const data = {
            GAMEID: gameId,
            USERID: userId,
            action: actionSelected.value,
            location: 'null',
            weapon: 'null',
            suspect: 'null'
        };


        if (actionSelected.value === "SUGGEST" || actionSelected.value === "ACCUSE") {
            data.location = (document.getElementById('roomSelect') as HTMLInputElement).value;
            data.weapon = (document.getElementById('weaponSelect') as HTMLInputElement).value;
            data.suspect = (document.getElementById('suspectSelect') as HTMLInputElement).value;
<<<<<<< HEAD
        } else {
=======
        } else if (actionSelected.value === "DISPROVE") {
            const choice = (document.getElementById("disproveSelect") as HTMLInputElement).value;
            if (rooms.indexOf(choice) > -1){
                data.location = choice;
            } else if (weapons.indexOf(choice) > -1) {
                data.weapon = choice;
            } else if (suspects.indexOf(choice) > -1){
                data.suspect = choice;
            }
        }
        else {
>>>>>>> b393a86ea56cf1c3271e7001086481c88283287d
            if (actionSelected.id === 'leftAction') {
                data.location = 'left';
            } else if (actionSelected.id === 'rightAction') {
                data.location = 'right';
            } else if (actionSelected.id === 'upAction') {
                data.location = 'up';
            } else if (actionSelected.id === 'downAction') {
                data.location = 'down';
            } else if (actionSelected.id === 'diagonalAction') {
                data.location = 'diagonal';
            } else {
                console.error("Direction not available.");
            }
        }

        data.action = actionSelected.value;

        try {
            const message = await sendMessage(data);
            // sendMessage() is void and so message will be undefined
            console.log('Message received: ', message);
            form.reset();
        } catch (error) {
            console.error(`Error sending message: `, error);
            alert(`Failed to send message.`);
        }
    });
    // Initial call to set the correct display state based on the default checked radio
    toggleSelectOptions();
});