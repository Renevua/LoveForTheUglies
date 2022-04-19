$(document).ready(function () {

    $('#signUpButton').click(function(){
        userInfo = {
            Username : $('#username').val(),
            Password : $('#password').val(),
        }
        $.ajax({
            url: "/signUpUser", // Url of backend (can be python, php, etc..)
            type: "POST", // data type (can be get, post, put, delete)
            data : userInfo,
            success: function (response, textStatus, jqXHR) {
            console.log("updated")
            window.location = '/'
            }
    })
    })

});