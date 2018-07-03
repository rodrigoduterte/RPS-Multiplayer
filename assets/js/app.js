selectControls();
appendGreetToHello();
appendRPSToInteract();
eventsToRPS();

$(document).ready(function(){
    $('#playerbtn').on('click',function(){
        var inputval;
        inputval = $('#playerInput').val();
        if (inputval != "") {
            addPlayer();
            InputControlsSwitch('none');
        }
    });
    $('#chatbtn').on('click',function () {
        if ($('#chatInput').val() != ""){
            updateChat($('#chatInput').val(),localStorage.getItem('name'));
        } 
     });

    //  $('#result').on('change',function () {
    //     if ($('#result').val() != "") {
    //         // call timeout
    //         setTimeout(function() {

    //         },3000);
    //     }
    //  })
});

window.onunload = () => {
    resetPlayerInfo(localStorage.getItem('id'));
    localStorage.clear();
}