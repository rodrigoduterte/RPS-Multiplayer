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
    var match = idMatch(turnOf);
    if (snap.val().players === 2) {
        if (turnOf === "") {
            game.update({turnOf: "1"});
            match ? showRPS() : null;
        } else if (turnOf === "1" && player.chose) {
            game.update({turnOf: "2"});
            match ? showRPS() : null;
            player.chose = false;
        } else if (turnOf === "2" && player.chose) {
            game.update({turnOf: "1"});
            match ? showRPS() : null;
            player.chose = false;
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

function updatePlayerName () {
    // players.child(id).update({"name": name});
    player.baseRef.update({"name":player.name});
}

function updatePlayerChoice () {
    // players.child(id).update({"choice": choice});
    player.baseRef.update({"choice":player.choice});
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
    player.baseRef.update({
        choice: "",
        losses: 0,
        wins: 0,
        name: ""
    });
}

function resetGameInfo () {
    game.set({
        "turnOf": "",
        "players": 0
    })
}

function assignPlayerID () {
    // array format
    // ["0","1"]
    // ["0"] OR ["1"]
    arrayfromdatabase = [];
    players.on('value',function(snap){
        var count = 0;
        snap.forEach(element => {
            if (element.val().name === "") {
                // arrayfromdatabase[0].push(element.val().order);
                arrayfromdatabase[1].push(element.key);
            } else {
                count++;
            }
            // arrayfromdatabase[1].push(element.key);
        });
        // game.child('players').set({players: count});
        game.update({players: parseInt(count)});
    });
    // return arrayfromdatabase[1][arrayfromdatabase[0][0]];
    return arrayfromdatabase[0];
}

function createPlayerReferences() {
    var player1 = database.ref('players/1');
    var player2 = database.ref('players/2');
    // player.refs = ["base","enemy"];
    // player.refsByOrder = [player1,player2];
    player.ref1 = player1;
    player.ref2 = player2;
    if (player.id === 1) {
        // player.refs[0] = player1; //assign base
        player.baseRef = player1;
        // player.refs[1] = player2; //assign enemy
        player.enemyRef = player2;
    } else if (player.id === 2) {
        // player.refs[0] = player2; //assign base
        player.baseRef = player2;
        // player.refs[1] = player1; //assign enemy
        player.enemyRef = player1;
    }
    eventHandlersForPlayerReferences();
}

function eventHandlersForPlayerReferences () {
    player.ref1.on('value',function(snap){
        displayPlayer('player1name',snap.val().name);
    });
    player.ref2.on('value',function(snap){
        displayPlayer('player2name',snap.val().name);
    });
}