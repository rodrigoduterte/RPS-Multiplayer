player = {
    id: null,
    name: null,
    chose: false,
    choice: null,
    p1wins: 0,
    p1losses: 0,
    p2wins: 0,
    p2losses: 0,
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
    },
    "score" : function (p1,p2) {
        if (p1 && p2) {
            if (this[p1].indexOf(p2) === 0) {
                return [0,0,0,0];
            } else if (this[p1].indexOf(p2) === 1) {
                return [0,1,1,0];
            } else if (this[p1].indexOf(p2) === 2) {
                return [1,0,0,1];
            }
        } else {
            return [0,0,0,0];
        } 
    }
};