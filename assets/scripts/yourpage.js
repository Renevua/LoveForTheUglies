$(document).ready(function () {
    $('#nameChangeButton').click(function(){
        console.log($('#newUsername').val())
        $.ajax({
            url: "/updateUsername", // Url of backend (can be python, php, etc..)
            type: "POST", // data type (can be get, post, put, delete)
            data : {newName : $('#newUsername').val()},
            success: function (response, textStatus, jqXHR) {
            console.log("updated")
                location.reload()
            }
    })
    });

    $('#deleteAccount').click(function(){
        let password = prompt("Are you sure you want to delete your account?\nEnter your password to continue:", "");
        if (password == null || password == "") {
            text = "Canceled.";
        } else {

            usrInfo = {
                Username : Session.username,
                Password : password
            }

            $.ajax({
                url: "/deleteUser", // Url of backend (can be python, php, etc..)
                type: "POST", // data type (can be get, post, put, delete)
                data : usrInfo,
                success: function (response, textStatus, jqXHR) {                   
                    console.log("Bye")
                    window.location = '/'
                }}
            );
        }
    })
});