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

players.on('value',function(snap){
    var count = 0;
    // var arraydb = [];
    var p1c = snap.child('1').val().choice;
    var p1n = snap.child('1').val().name;
    var p2c = snap.child('2').val().choice;
    var p2n = snap.child('2').val().name;
    // console.log(snap.val());
    snap.forEach(element => {
        if (element.val().name != "") {
            // arraydb.push(element.key);
            count++;
        }
        // console.log(element.key + ":" + element.val().choice);
        // if (element.val().id === "1") {
        //     console.log("choice1: "+ element.val().choice);
        //     window.whoWins.setP1choice(element.val().choice);
        // } else if (toString(element.val().id) === "2") {
        //     console.log("choice2: "+ element.val().choice);
        //     window.whoWins.setP2choice(element.val().choice);
        // }
    });
    console.log(snap.child('1').val().name + "," + snap.child('1').val().choice);
    console.log(snap.child('2').val().name + "," + snap.child('2').val().choice);
    $('#result').val(window.whoWins.compare([p1n,p1c],[p2n,p2c]));
    // localStorage.setItem('id',arraydb[0]);
    // localStorage.setItem('name',name);
    // displayWelcomeText(name,arraydb[0]);
    // displayPlayer(name,arraydb[0]);
    // updatePlayerName (name,arraydb[0]);
    game.update({players: parseInt(count)});
    // console.log(arraydb[0]);
});

players.on('child_changed',function(snap){
    var p1c = snap.child('1').val().choice;
    var p1n = snap.child('1').val().name;
    var p2c = snap.child('2').val().choice;
    var p2n = snap.child('2').val().name;
    console.log(snap.val());
    displayPlayer(snap.val().name,snap.key);
    displayStatus(snap.key,snap.val().wins,snap.val().losses);
    displayResult([],[]);
});

// database.ref('players/2/choice').on('value',function(snap){
//     if(snap.val().choice != "") {
//         var player1choice;
//         var player2choice = snap.val();
//         console.log("player1:"+player1choice);
//         console.log("player2:"+player2choice);
//         database.ref('players/1').once('value').
//         then(function(snap){
//             player1choice = snap.val().choice;
//         });
//         console.log(window.whoWins);
//         window.whoWins.compare(player1choice,player2choice);
//     }
// });

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

function createPR(id) {
    console.log("createPR:"+id);
    var player1 = database.ref('players/1');
    var player2 = database.ref('players/2');
    player.ref1 = player1;
    player.ref2 = player2;
    if (id === "1") {
        player.baseref = player1;
        player.enemyref = player2;
    } else if (id === "2") {
        player.baseref = player2;
        player.enemyref = player1;
    }
    // eventsForPR();
}

// function eventsForPR () {
//     console.log("eventhandlers:");
//     player.ref1.on('value',function(snap){
//         displayPlayer('player1name',snap.val().name);
//     });
//     player.ref2.on('value',function(snap){
//         displayPlayer('player2name',snap.val().name);
//     });
// }