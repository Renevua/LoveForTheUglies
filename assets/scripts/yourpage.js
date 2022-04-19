//This code handles the functions relating to editing and deleting user from the database

$(document).ready(function () {
    //Changing the username button below
    $('#nameChangeButton').click(function(){
        console.log($('#newUsername').val())
        $.ajax({
            url: "/updateUsername", 
            type: "POST", 
            data : {newName : $('#newUsername').val()},
            success: function (response, textStatus, jqXHR) {
            console.log("updated")
                location.reload()
            }
    })
    });

    //Deleting account button below
    $('#deleteAccount').click(function(){
        //It prompts user with a pop-up to input password to delete the account
        //Prevents from accidentally clicking on delete and permamently doing so, in case it was a misclick
        let password = prompt("Are you sure you want to delete your account?\nEnter your password to continue:", "");
        if (password == null || password == "") {
            text = "Canceled.";
        } else {

            usrInfo = {
                Username : Session.username,
                Password : password
            }

            $.ajax({
                url: "/deleteUser", 
                type: "POST", 
                data : usrInfo,
                success: function (response, textStatus, jqXHR) {                   
                    console.log("Bye")
                    window.location = '/'
                }}
            );
        }
    })
});