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

function displayMessages(key,value){
    document.getElementById('messages').innerHTML += '<pre>' + key + ': ' + value + '</pre>';
}

function displayStatus(id,wins,losses){
    // var wins = localStorage.getItem('wins');
    // var losses = localStorage.getItem('losses');
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
        console.log('eventstorps:'+id);
        localStorage.setItem('choice',choice);
        localStorage.setItem('chose',true);
        updatePlayerChoice(id,choice);
        if (id === "1") {
            document.getElementById('player1chose').innerHTML = choice;
            game.update({turnOf: "2"});
        } else if (id === "2") {
            document.getElementById('player2chose').innerHTML = choice;
            // game.update({turnOf: "1"});
        }
    };

    for (var i = 0; i < rps.length; i++) {
        rps[i].addEventListener('click', functionForClickedRPS, false);
    }
}

function showRPS(){
    console.log("showRPS");
    console.log(localStorage.getItem('id'));
    if (parseInt(localStorage.getItem('id')) === 1) {
        console.log("showRPS2");
        player1options.style.display = 'block';
        player2options.style.display = 'none';
    } else if (parseInt(localStorage.getItem('id')) === 2) {
        console.log("showRPS3");
        player1options.style.display = 'none';
        player2options.style.display = 'block';
    }
}

function appendRPSToInteract() {
    player1options.innerHTML = RPS;
    var x = document.getElementById("player1options").querySelectorAll("button");
    // for(var i=0; i<x.length; i++) {
    // 	x[i].style.background = "red";
	// }
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