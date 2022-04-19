$(document).ready(function () {
    for(i=0; i<Session.InterestedEvents.length;i++){
        console.log("#"+Session.InterestedEvents[i]+"SignUp")
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
    $('.SignOutButton').click(function(){
        console.log((Session))
        console.log(Session.InterestedEvents)
        Session.InterestedEvents.splice(Session.InterestedEvents.indexOf(this.id))
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