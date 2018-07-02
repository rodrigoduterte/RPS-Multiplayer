selectControls();
appendGreetToHello();
appendRPSToInteract();
eventsToRPS();

$(document).ready(function(){
    // playerbtn.onclick = function() {
    $('#playerbtn').on('click',function(){
        var id;
        var inputval;
        inputval = $('#playerInput').val();
        console.log("btn");
        if (inputval != "") {
            // id = assignPlayerID();
            addPlayer();
            // console.log(id);
            // updatePlayerName(inputval,id);
            // console.log(localStorage.getItem('id'));
            InputControlsSwitch('none');
        }
    });
    // };
    $('#chatbtn').on('click',function () {
        chat.message = $('#chatInput').val();
        if (chat.message != ""){
            console.log("ccc");
            // updateChat();
        } 
     });
});

window.onunload = () => {
    localStorage.clear();
}