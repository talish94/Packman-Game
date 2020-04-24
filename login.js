$(document).ready(function() {
    $("#login").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        // Checking for blank fields.
        if (username == '' || password == '') {
            $('input[type="t"],input[type="p"]').css("border", "2px solid red");
            $('input[type="t"],input[type="p"]').css("box-shadow", "0 0 3px red");
            alert("Please fill all fields...!!!!!!");
        } else {
            $.post("login.php", { username1: username, password1: password },
                function(data) {
                    if (data == 'Invalid Username.......') {
                        $('input[type="t"]').css({ "border": "2px solid red", "box-shadow": "0 0 3px red" });
                        $('input[type="p"]').css({ "border": "2px solid #00F5FF", "box-shadow": "0 0 5px #00F5FF" });
                        alert(data);
                    } else if (data == 'Username or Password is wrong...!!!!') {
                        $('input[type="t"],input[type="p"]').css({ "border": "2px solid red", "box-shadow": "0 0 3px red" });
                        alert(data);
                    } else if (data == 'Successfully Logged in...') {
                        $("form")[0].reset();
                        $('input[type="t"],input[type="p"]').css({ "border": "2px solid #00F5FF", "box-shadow": "0 0 5px #00F5FF" });
                        alert(data);
                    } else {
                        alert(data);
                    }
                });
        }
    });
});