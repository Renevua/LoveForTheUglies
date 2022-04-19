$(document).ready(function () {
    for(i=0; i<Session.InterestedEvents.length();i++){
        $("#"+Session.InterestedEvents[i]+"SignUp").prop("disabled", true);
    }
    $('.EventButton').click(function(){
        console.log((Session))
        console.log(Session.InterestedEvents)
        Session.InterestedEvents.push(this.id)
        console.log(Session.InterestedEvents)

        $.ajax({
            url: "/updateEvent", // Url of backend (can be python, php, etc..)
            type: "POST", // data type (can be get, post, put, delete)
            data : {newInt : Session.InterestedEvents},
            success: function (response, textStatus, jqXHR) {
            console.log("updated")
            }
    })
    })
})