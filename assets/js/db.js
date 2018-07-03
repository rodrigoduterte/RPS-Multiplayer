// Initialize Firebase
config = {
    apiKey: "AIzaSyCMYiebbgJOTCwsb5_JQRWpP93reVLXcG0",
    authDomain: "rps-multiplayer-72a18.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-72a18.firebaseio.com",
    projectId: "rps-multiplayer-72a18",
    storageBucket: "rps-multiplayer-72a18.appspot.com",
    messagingSenderId: "778895557059"
  };
firebase.initializeApp(config);

database = firebase.database();

players = database.ref('players/');
chats = database.ref('chats/');
game = database.ref('game/');

game.on('value',function(snap){
    var turnOf = snap.val().turnOf;
    if (snap.val().players === 2) {
        showRPS();
    }
});

chats.on("child_added",function(snap){
    snap.forEach(element => {
        displayMessages(element.key,element.val());
    })
})

function updatePlayerName (name,id) {
    database.ref('players/'+id).update({name:name});
}

function updatePlayerChoice (id,choice) {
    database.ref('players/'+id).update({"choice": choice});
}

function updateChat (msg,name) {
    chat[name] = msg;
    chats.push(chat);
}

function resetPlayerInfo (id) {
    database.ref('game').transaction(function(players){return players - 1;});
    
    database.ref('players/'+id)({
        choice: "",
        losses: 0,
        wins: 0,
        name: ""
    });
}

players.on('value',function(snap){
    var count = 0;
    var p1c = snap.child('1').val().choice;
    var p1n = snap.child('1').val().name;
    var p2c = snap.child('2').val().choice;
    var p2n = snap.child('2').val().name;
    snap.forEach(element => {
        if (element.val().name != "") {
            count++;
        }
    });
    displayResult(window.whoWins.compare([p1n,p1c],[p2n,p2c]));
    addScore = window.whoWins.score(p1c,p2c);
    if (addScore[0] === 0 && addScore[1] === 1) {
        players.off('value');
        // players.off('child_changed');
        database.ref('players/1').off('value');
        database.ref('players/2').off('value');
        addPlayer1Losses();
        addPlayer2Wins();
    } else if (addScore[0] === 1 && addScore[1] === 0) {
        addPlayer1Wins();
        addPlayer2Losses();
    }
    game.update({players: parseInt(count)});
    // setTimeout(function(){
    //     players.update({
    //         "1":{
    //             choice:""
    //         },
    //         "2":{
    //             choice:""
    //         }
    //     });
    // },3000);
});


players.on('child_changed',function(snap){
    displayPlayer(snap.val().name,snap.key);
    displayStatus(snap.key,snap.val().wins,snap.val().losses);
    if (snap.key === "2" && snap.val().choice != "") {
        hideAllRPS();
    }
    if (snap.val().wins > 0 || snap.val().losses > 0) {
        displayChosen(snap.key,snap.val().choice);
    }

    if (snap.key === "1" && snap.val().choice != "") {
        displayReminder("It's your turn","2");
        displayReminder("Waiting for Player 1","1");
    } 
    if (snap.key === "2" && snap.val().name != "") {
        displayReminder("It's your turn","1");
        displayReminder("Waiting for Player 2","2");
    } 
});

function addPlayer() {
    database.ref('players/1').on('value',function(s){
        var wins = s.val().wins;
        var losses = s.val().losses;
        // try to delete $('#playerInput').val() != ""
        if (s.val().name === "" && $('#playerInput').val() != "") {
            database.ref('players/1').update({
                name: $('#playerInput').val()
            });
            database.ref('players/2').update({
                name: ""
            });
            console.log('hahahah');
            displayWelcomeText($('#playerInput').val(),"1");
            displayPlayer($('#playerInput').val(),"1");
            displayStatus("1",wins,losses);
            localStorage.setItem("id","1");
            localStorage.setItem("name",$('#playerInput').val());
            $('#playerInput').val("");
        }
    });
    database.ref('players/2').on('value',function(s){
        var wins = s.val().wins;
        var losses = s.val().losses;
        // try to delete $('#playerInput').val() != ""
        if (s.val().name === "" && $('#playerInput').val() != "") {
            console.log(s.key);
            database.ref('players/2').update({
                name: $('#playerInput').val()
            });
            displayWelcomeText($('#playerInput').val(),"2");
            displayPlayer($('#playerInput').val(),"2");
            displayStatus("2",wins,losses);
            localStorage.setItem("id","2");
            localStorage.setItem("name",$('#playerInput').val());
            $('#playerInput').val("");
        }
    });
}

function addPlayer1Wins () {
    database.ref('players/1/wins').transaction(function(wins){console.log(wins);return wins + 0.5;});
}

function addPlayer1Losses () {
    database.ref('players/1/losses').transaction(function(losses){console.log(losses);return losses + 0.5;});
}

function addPlayer2Wins () {
    database.ref('players/2/wins').transaction(function(wins){console.log(wins);return wins + 0.5;});
}

function addPlayer2Losses () {
    database.ref('players/2/losses').transaction(function(losses){console.log(losses);return losses + 0.5;});
}