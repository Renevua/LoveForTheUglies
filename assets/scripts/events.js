$(document).ready(function () {
    $('.EventButton').click(function(){
        console.log(Session.InterestedEvents)
        Session.InterestedEvents.push(this.id)
        console.log(Session.InterestedEvents)
        $.ajax({
            url: "/updateEvents", // Url of backend (can be python, php, etc..)
            type: "POST", // data type (can be get, post, put, delete)
            success: function (response, textStatus, jqXHR) {
            console.log("updated")
            }
    })
    })
})