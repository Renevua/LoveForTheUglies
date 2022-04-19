//This .js handles signign in and signing out of the Event Page that we have written by calling function from the server.js

$(document).ready(function () {

    //Below is code for the signing in button
    $('.EventButton').click(function () {

        //It checks if it is not in InterestedEvents Array of the database
        //If not then it adds to array
        if (!Session.InterestedEvents.includes(this.id)){
            Session.InterestedEvents.push(this.id)
            $.ajax({
                url: "/updateEvent", 
                type: "POST", 
                data: { newInt: Session.InterestedEvents },
                success: function (response, textStatus, jqXHR) {
                    location.reload();
                }
            })
        }
    })
    //Below is code for signing out button
    $('.SignOutButton').click(function () {

        //It checks if this is already interested event
        //If it is then it removes from the array
        if (Session.InterestedEvents.includes(this.id)){
        Session.InterestedEvents.splice(Session.InterestedEvents.indexOf(this.id))
        $.ajax({
            url: "/updateEvent", 
            type: "POST", 
            data: { newInt: Session.InterestedEvents },
            success: function (response, textStatus, jqXHR) {
                console.log("updated")
                location.reload();
            }
        })

        }
    })
})