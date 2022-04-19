$(document).ready(function () {

    $('.EventButton').click(function () {

        if (!Session.InterestedEvents.includes(this.id)){
            Session.InterestedEvents.push(this.id)

            $.ajax({
                url: "/updateEvent", // Url of backend (can be python, php, etc..)
                type: "POST", // data type (can be get, post, put, delete)
                data: { newInt: Session.InterestedEvents },
                success: function (response, textStatus, jqXHR) {
                    console.log("updated")
                }
            })
        }
    })
    $('.SignOutButton').click(function () {

        if (Session.InterestedEvents.includes(this.id)){
        Session.InterestedEvents.splice(Session.InterestedEvents.indexOf(this.id))

        $.ajax({
            url: "/updateEvent", // Url of backend (can be python, php, etc..)
            type: "POST", // data type (can be get, post, put, delete)
            data: { newInt: Session.InterestedEvents },
            success: function (response, textStatus, jqXHR) {
                console.log("updated")
            }
        })

        }
    })
})