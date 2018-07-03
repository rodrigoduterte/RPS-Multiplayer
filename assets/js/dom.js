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

function InputControlsSwitch(display) {
    document.getElementById("playerInput").style.display = display;
    document.getElementById("playerbtn").style.display = display;
}

function displayWelcomeText(name,id){       
    var greet = document.getElementById('greet');
    greet.innerHTML = 'Hi ' + name + '! You are Player ' + id;
    greet.style.display = 'inline';
}

function displayPlayer(name,id){
    if (id === "1") {
        document.getElementById('player1name').innerHTML = name;
    } else if (id === "2") {
        document.getElementById('player2name').innerHTML = name;
    }
}

function displayReminder(msg,id){
    if (id === "1") {
        document.getElementById('reminder1').innerHTML = msg;
    } else if (id === "2") {
        document.getElementById('reminder2').innerHTML = msg;
    }
}

function displayChosen(id,c){
    if (c) {
        if (id === "1") {
            document.getElementById('player1chose').innerHTML = c;
        }
        if (id === "2") {
            document.getElementById('player2chose').innerHTML = c;
        }
    }
}

function displayMessages(key,value){
    document.getElementById('messages').innerHTML += '<pre>' + key + ': ' + value + '</pre>';
}

function displayStatus(id,wins,losses){
    if (id === "1") {
        document.getElementById('player1status').innerHTML = 'Wins: ' + wins + '; Losses: ' + losses; 
    } else if (id === "2") {
        document.getElementById('player2status').innerHTML = 'Wins: ' + wins + '; Losses: ' + losses;         
    }
}

function displayResult (result) {
    document.getElementById('result').innerHTML = result;
}

function clearMessages () {
    document.getElementById('messages').innerHTML = "";
}

function eventsToRPS() {
    var rps = document.getElementsByClassName("rps");
    functionForClickedRPS = function() {
        var id = this.parentNode.getAttribute('id').charAt(6);
        var choice = this.getAttribute("id");
        localStorage.setItem('choice',choice);
        updatePlayerChoice(id,choice);
        if (id === "1") {
            document.getElementById('player1chose').innerHTML = choice;
            hideAllRPS();
            game.update({turnOf: "2"});
        } else if (id === "2") {
            document.getElementById('player2chose').innerHTML = choice;
            hideAllRPS();
        }
    };

    for (var i = 0; i < rps.length; i++) {
        rps[i].addEventListener('click', functionForClickedRPS, false);
    }
}

function showRPS(){
    if (parseInt(localStorage.getItem('id')) === 1) {
        player1options.style.display = 'block';
        player2options.style.display = 'none';
        $("#reminder1").show();
        $("#reminder2").hide();
    } else if (parseInt(localStorage.getItem('id')) === 2) {
        player1options.style.display = 'none';
        player2options.style.display = 'block';
        $("#reminder1").hide();
        $("#reminder2").show();
    }
}

function appendRPSToInteract() {
    player1options.innerHTML = RPS;
    var x = document.getElementById("player1options").querySelectorAll("button");
    player2options.innerHTML = RPS;
    hideAllRPS();
}

function appendGreetToHello() {
    document.getElementById('hello').innerHTML += greet;
    document.getElementById('greet').style.display = 'none';
}

function hideAllRPS () {
    player1options.style.display = 'none';
    player2options.style.display = 'none';
}