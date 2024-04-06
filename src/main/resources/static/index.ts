import { wsManager } from './websocketManager.js';


document.addEventListener('DOMContentLoaded', () => {
    wsManager.connect();

    // Set up an event listener for when messages are received
    wsManager.onMessage((event: MessageEvent) => {
        console.log('Message from server:', event.data);
        const message = JSON.parse(event.data)
        console.log("Message received:", JSON.stringify(message))
        if (message.type === 'GAMEID') {
            const gameId = message.GAMEID
            console.log("?????", gameId);
            document.cookie = `gameId=${gameId}; path=/; max-age=86400`;
        }
    });

    // Event listener for "Host a Game" button
    document.getElementById('hostGame')?.addEventListener('click', () => {
        const message = { action: 'hostGame' };
        console.log("TEST", message);
        wsManager.sendMessage( message );
        window.location.href='game.html'
    });

    // Event listener for "Quick Join" button
    document.getElementById('quickJoin')?.addEventListener('click', () => {
        wsManager.sendMessage({ action: 'quickJoin' });
    });

    // Event listener for "Join Private Game" button
    document.getElementById('joinPrivateGame')?.addEventListener('click', () => {
        const gameId = (document.getElementById('gameIdInput') as HTMLInputElement).value;
        if (gameId) {
            wsManager.sendMessage({ action: 'joinPrivateGame', gameId });
        } else {
            console.error('Game ID is required for joining a private game.');
        }
    });
});