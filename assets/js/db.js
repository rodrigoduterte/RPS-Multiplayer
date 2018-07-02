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
// gamePlayers = database.ref('game/players');

game.on('value',function(snap){
    var turnOf = snap.val().turnOf;
    var chose = localStorage.getItem('chose');
    console.log(chose);
    if (snap.val().players === 2) {
        if (turnOf === "") {
            console.log("condition1:"+chose);
            showRPS();
        } else if (turnOf === "2") {
            console.log("condition2:"+chose);
            showRPS();
        }
    }
});

chats.on("child_added",function(snap){
    clearMessages();
    snap.forEach(element => {
        displayMessages(element.key,element.val());
    })
})

idMatch = (dbID) => {
    return dbID === player.id;
}

function updatePlayerName (name,id) {
    // players.child(id).update({"name": name});
    database.ref('players/'+id).update({name:name});
    console.log('updatePlayerName');
}

function updatePlayerChoice (id,choice) {
    database.ref('players/'+id).update({"choice": choice});
}

function updateChat () {
    chats.push({
        player: player.name, // get player who pressed the button
        message: chat.message // get the message the player typed in the message box 
    });
}

function updateTurnOf () {
    game.update({turnOf: player.id});
}

function resetPlayerInfo () {
    game.update({

    });
    // player.baseRef.update({
    //     choice: "",
    //     losses: 0,
    //     wins: 0,
    //     name: ""
    // });
}

function resetGameInfo () {
    game.set({
        "turnOf": "",
        "players": 0
    })
}

players.on('value',function(snap){
    var count = 0;
    var p1c = snap.child('1').val().choice;
    var p1n = snap.child('1').val().name;
    var p2c = snap.child('2').val().choice;
    var p2n = snap.child('2').val().name;
    // console.log(snap.val());
    snap.forEach(element => {
        if (element.val().name != "") {
            count++;
        }
    });
    displayResult(window.whoWins.compare([p1n,p1c],[p2n,p2c]));
    addScore = window.whoWins.score(p1c,p2c);
    console.log(addScore);
    if (addScore[0] === 0 && addScore[1] === 1) {
        addPlayer1Losses();
        addPlayer2Wins();
    } else if (addScore[0] === 1 && addScore[1] === 0) {
        addPlayer1Wins();
        addPlayer2Losses();
    }
    game.update({players: parseInt(count)});
});

database.ref('players/1/wins').on('value',function(){
    database.ref('player/1/wins').transaction(function(wins){
        console.log('run transact1');
        database.ref('player/1').update({
            wins: wins + 1
        });
        //return parseInt(wins) + 1;
    })
});

players.on('child_changed',function(snap){
    displayPlayer(snap.val().name,snap.key);
    displayStatus(snap.key,snap.val().wins,snap.val().losses);
    // displayResult(window.whoWins.compare([p1n,p1c],[p2n,p2c]));
});

function addPlayer() {
    database.ref('players/1').on('value',function(s){
        var wins = s.val().wins;
        var losses = s.val().losses;
        // try to delete $('#playerInput').val() != ""
        if (s.val().name === "" && $('#playerInput').val() != "") {
            console.log(s.key);
            database.ref('players/1').update({
                name: $('#playerInput').val()
            });
            database.ref('players/2').update({
                name: ""
            });
            displayWelcomeText($('#playerInput').val(),"1");
            displayPlayer($('#playerInput').val(),"1");
            displayStatus("1",wins,losses);
            localStorage.setItem("id","1");
            // player.id = "1";
            // player.name = $('#playerInput').val("");
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
            // player.id = "2";
            localStorage.setItem("name",$('#playerInput').val());
            $('#playerInput').val("");
        }
    });
}

function addPlayer1Wins () {
    // database.ref('players/1/wins').on('value',function(){
        database.ref('player/1').update({
            wins: database.ref('player/1/wins').transaction(function(wins){return wins + 1;})
        });
    // });
}

function addPlayer1Losses () {
    // database.ref('players/1/losses').on('value',function(){
        database.ref('player/1').update({
            losses: database.ref('player/1/losses').transaction(function(losses){return losses + 1;})
        });
    // });
}

function addPlayer2Wins () {
    // database.ref('players/2/wins').on('value',function(){
        database.ref('player/2/wins').update({
            wins: database.ref('player/2/wins').transaction(function(wins){return wins + 1;})
        });
    // });
}

function addPlayer2Losses () {
    // database.ref('players/2/losses').on('value',function(){
        database.ref('player/2').update({
            losses: database.ref('player/2/losses').transaction(function(losses){return losses + 1;})
        });
    // });
}