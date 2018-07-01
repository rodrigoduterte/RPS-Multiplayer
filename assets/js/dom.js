function selectControls () {
    // Retrieve control elements
    playerbtn = document.getElementById("playerbtn");
    chatbtn = document.getElementById('chatbtn');
    // Retrieve display elements
    player1options = document.getElementById('player1options');
    player2options = document.getElementById('player2options');
    // These variables will only be used to replace the value of the div that displays the player name
    // once a player leaves the game
    player1waiting = document.getElementById('player1name').value; 
    player2waiting = document.getElementById('player2name').value;    
}



function manageControlEvents() {
    
     chatbtn.onclick = function () {
        chat.message = document.getElementById('chatInput').value;
        if (chat.message != ""){
            console.log("ccc");
            updateChat();
        } 
     };
}

function InputControlsSwitch(display) {
    document.getElementById("playerInput").style.display = display;
    document.getElementById("playerBtn").style.display = display;
}

function displayWelcomeText(){
    var greet = document.getElementById('greet');
    greet.innerHTML = 'Hi ' + player.name + '! You are Player ' + player.id;
    greet.style.display = 'inline';
}

function displayPlayer(id,name){
    document.getElementById(id).innerHTML = name;
}

function displayMessages(key,value){
    document.getElementById('messages').innerHTML += '<pre>' + key + ': ' + value + '</pre>';
}

function clearMessages () {
    document.getElementById('messages').innerHTML = "";
}

function attachEventsToPlayerOptions(playerOptions) {
    var rps = document.getElementsByClassName("rps");
    functionForClickedRPS = function() {
        player.choice = this.getAttribute("id");
        player.chose = true;
        updateTurnOf();
        updatePlayerChoice();
    };

    for (var i = 0; i < rps.length; i++) {
        rps[i].addEventListener('click', functionForClickedRPS, false);
    }
}

function showRPS(){
    if (player.id === 1) {
        player1options.style.display = 'block';
        player2options.style.display = 'none';
    } else if (player.id === 2) {
        player1options.style.display = 'none';
        player2options.style.display = 'block';
    }
}

function appendRPSToInteract() {
    player1options.innerHTML = RPS;
    player2options.innerHTML = RPS;
    hideAllRPS();
}

function appendGreetToHello() {
    document.getElementById('hello').innerHTML += greet;
    document.getElementById('greet').style.display = 'none';
}

function hideAllRPS () {
    // var rps = document.getElementsByClassName("rps");
    // for (var i = 0; i < rps.length; i++) {
    //     rps[i].style.display = 'none';
    // }
    player1options.style.display = 'none';
    player2options.style.display = 'none';
}