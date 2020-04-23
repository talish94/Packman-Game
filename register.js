$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});

$().ready(function() {

    var users = [];
    users.push({ username: "p", password: "p" }); //default one.

    // validate signup form on submit
    $("#signupForm").validate({
        rules: {
            firstname: {
                required: true,
                digits: false
            },
            lastname: {
                required: true,
                digits: false
            },
            username: {
                required: true,
            },

            password: {
                required: true,
                minlength: 6,
                containNumbers: {
                    text: "Your input should contain at least 1 digit",
                    minLength: 1,
                    regex: new RegExp('[^0-9]', 'g')
                },
                containLetter: {
                    text: "Your input should contain at least one character",
                    minLength: 1,
                    regex: new RegExp('[^a-zA-Z]', 'g')
                },
            },

            email: {
                required: true,
                email: true,
                text: "Please enter a valid email address",
            },

        },
        messages: {
            firstname: {
                required: "Please enter a username",
                digits: "Your first name must not contain digits",
            },
            lastname: {
                required: "Please enter a username",
                digits: "Your last name must not contain digits",
            },
            username: {
                required: "Please enter a username"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                containNumbers: "Your input should contain at least 1 digit"
            },
            // confirm_password: {
            // 	required: "Please provide a password",
            // 	minlength: "Your password must be at least 5 characters long",
            // 	equalTo: "Please enter the same password as above"
            // },
        }
    });

    function saveUserSignUpForm() {
        //var txtbox1=document.getElementById("txtbox1");
        //sessionStorage.setItem("name",txtbox1.value);



        var person = { username: getElementById("username"), password: getElementById("password"), fullname: getElementById("fullname") };
        users.push(person);
    }

});