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
});