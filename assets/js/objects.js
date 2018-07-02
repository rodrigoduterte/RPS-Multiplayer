player = {
    id: null,
    name: null,
    chose: false,
    choice: null,
    wins: 0,
    losses: 0
};

for (var key in player) {
    if (player.hasOwnProperty(key)) {
        localStorage.setItem(key,player[key]);
    }
}

chat = {};

rpsTemplate = {'<>':'button','class':'rps','id':'${id}','text':'${name}'};;

rpsData = [
    {'name':'Rock','id':'rock'},
    {'name':'Paper','id':'paper'},
    {'name':'Scissors','id':'scissors'}
];

// rps = ``;
RPS = json2html.transform(rpsData,rpsTemplate);

greet = `<p id='greet'></p>`;

whoWins = {
    "rock" : ["rock","paper","scissors"],
    "paper" : ["paper","scissors","rock"],
    "scissors" : ["scissors","rock",""],
    "compare" : function (p1,p2) {
        if (p1[1] && p2[1]) {
            if (this[p1[1]].indexOf(p2[1]) === 0) {
                console.log("tie");
                return "Tie Game!";
            } else if (this[p1[1]].indexOf(p2[1]) === 1) {
                console.log("p1 looses. p2 wins");
                return p2[0] + " wins";
            } else if (this[p1[1]].indexOf(p2[1]) === 2) {
                console.log("p1 wins. p2 looses");
                return p1[0] + " wins";
            }
        } else {
            console.log("compare not run");
            return "";
        }
    }
};