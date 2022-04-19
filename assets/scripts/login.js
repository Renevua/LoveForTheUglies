//This piece of code handles signing in and out code from the site itself

$(document).ready(function () {

    //Sign up button below
    $('#signUpButton').click(function () {
        userInfo = {
            Username: $('#username').val(),
            Password: $('#password').val(),
        }
        $.ajax({
            url: "/signUpUser", 
            type: "POST", 
            data: userInfo,
            success: function (response, textStatus, jqXHR) {
                console.log("updated")
                window.location = '/'
            }
        })
    })
    //Signing out button below
    $('#signOut').click(function () {
        $.ajax({
            url: "/signOut", 
            type: "POST", 
            success: function (response, textStatus, jqXHR) {
                console.log("SignedOut")
                window.location = '/'
            }
        })
    })

});