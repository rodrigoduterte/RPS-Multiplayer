selectControls();
appendGreetToHello();
appendRPSToInteract();
eventsToRPS();

$(document).ready(function(){
    $('#playerbtn').on('click',function(){
        var id;
        var inputval;
        inputval = $('#playerInput').val();
        console.log("btn");
        if (inputval != "") {
            addPlayer();
            InputControlsSwitch('none');
        }
    });
    $('#chatbtn').on('click',function () {
        chat.message = $('#chatInput').val();
        if (chat.message != ""){
            console.log("ccc");
        } 
     });
});

window.onunload = () => {
    localStorage.clear();
}