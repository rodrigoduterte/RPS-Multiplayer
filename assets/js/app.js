//refresh button makes the player leave
// window.onload = function () {
//     selectControls();
//     manageControlEvents();
//     appendGreetToHello();
//     appendRPSToInteract();
    
// };

$(document).ready(function () {
    playerbtn = document.getElementById("playerbtn");
    chatbtn = document.getElementById('chatbtn');
    // Retrieve display elements
    player1options = document.getElementById('player1options');
    player2options = document.getElementById('player2options');
    // These variables will only be used to replace the value of the div that displays the player name
    // once a player leaves the game
    player1waiting = document.getElementById('player1name').value; 
    player2waiting = document.getElementById('player2name').value; 
    $("#playerbtn").on('click',function () {
        player.name = document.getElementById('playerInput').value;
        console.log("btn");
        if (player.name != "") {
            player.id = assignPlayerID();
            // createPlayerReferences();
            // updatePlayerName();
            // displayWelcomeText();
            // InputControlsSwitch('none');
        }
     });
    appendGreetToHello();
    appendRPSToInteract();
});

// window.onbeforeunload = function () {
//     resetPlayerInfo();
// };