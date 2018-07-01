player = {};
player.chose = false;
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
