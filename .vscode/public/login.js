$(document).ready(function() {
    $("#loginbutton").click(function() {
        var usernameLogin = $("#usernameLogin").val();
        var passwordLogin = $("#passwordLogin").val();
        // Checking for blank fields.
        if (usernameLogin == '') {
            $('input[type="t"]').css("border", "2px solid red");
            $('input[type="t"]').css("box-shadow", "0 0 3px red");
            alert("Please fill in your username.");
        } else if (passwordLogin == '') {
            $('input[type="p"]').css("border", "2px solid red");
            $('input[type="p"]').css("box-shadow", "0 0 3px red");
            alert("Please fill in your password.");
        } else {

            logedInSuccessfully = correctDetailsUser(usernameLogin, passwordLogin);

            if (!logedInSuccessfully) { //user is not signed in to the system.
                window.alert("User name or password are incorrect. Please try again.")
            } else {
                document.getElementById("userNameWithGame").value = usernameLogin;
                showSettings(); //moves to the game's settings
                //isLoggedIn=true;
                //user_name=userName;
            }
        }
    });
});


function correctDetailsUser(usernameLogin, passwordLogin) { //returns true if the user's details are correct.
    var size = allUsers.length;
    for (i = 0; i < size; i++) {
        var currUser = allUsers[i];
        if (currUser.username == usernameLogin) {
            if (currUser.password == passwordLogin) {
                return true;
            }
            return false;
        }
    }
    return false;
}