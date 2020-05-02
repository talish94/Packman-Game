$.validator.setDefaults({
    submitHandler: function() {
        saveRegisterForm();
        //alert("submitted!");
    }
});


$().ready(function() {
   
jQuery.validator.addMethod("notNumber", function(value, element, param) {
    var reg = /[0-9]/;
    if (reg.test(value)) {
        return false;
    } else {
        return true;
    }
}, "Number is not permitted");

$.validator.addMethod("password", function(value, element) {
    return (/\d/.test(value) && /[a-zA-Z]/.test(value))
}, "Your password must contain at least one letter and one digit!");

jQuery.validator.addMethod("noSpace", function(value, element) {
    return value == '' || value.trim().length != 0;
}, "No space please and don't leave it empty");


jQuery.validator.addMethod("customEmail", function(value, element) {
    return this.optional(element) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
}, "Please enter valid email address!");


$.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, and underscores only please");

var $registrationForm = $('#registration');
if ($registrationForm.length) {
    $registrationForm.validate({
        rules: {
            //username is the name of the textbox
            username: {
                required: true,
                //alphanumeric is the custom method, we defined in the above
                //alphanumeric: true,
            },
            email: {
                required: true,
                customEmail: true
            },
            password: {
                required: true,
                minlength: 6,
                password: true
            },
            confirm: {
                required: true,
                equalTo: '#password'
            },
            fname: {
                required: true,
                notNumber: true,
            },
            lname: {
                required: true,
                notNumber: true,
            },
            date: {
                required: true,
            },
        },
        messages: {
            username: {
                //error message for the required field
                required: 'Please enter username!'
            },
            email: {
                required: 'Please enter email!',
                //error message for the email field
                email: 'Please enter valid email!'
            },
            password: {
                required: 'Please enter password!'
            },
            confirm: {
                required: 'Please enter confirm password!',
                equalTo: 'Please enter same password!'
            },
            fname: {
                required: 'Please enter first name!'
            },
            lname: {
                required: 'Please enter last name!'
            },
        },
        errorPlacement: function(error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents('.gender'));
            } else if (element.is(":checkbox")) {
                error.appendTo(element.parents('.hobbies'));
            } else {
                error.insertAfter(element);
            }
        }
    });
}
});

function saveRegisterForm() {

	var userName = document.getElementById("username").value;
	var passWord = document.getElementById("password").value;

	// var firstname=document.getElementById("firstname").value;
	// var lastname=document.getElementById("lastname").value;
	// var email=document.getElementById("user_email").value;
	// var birthday=document.getElementById("birthday").value;
	// var date=birthday.split("-");
	// var day=date[2];
	// var month=date[1];
	// var year=date[0];

	//addedSuccess = addUserToArray(userName, password);

	if (isUserameExists(userName)){ // username already exists in the system
		window.alert("user name already exist. Please pick a new one and try again.");
		return;
	}
	else { 
		var newPerson = { username: userName, password: passWord };
		allUsers.push(newPerson);
		window.alert("User added successfully! Please log in now to play the game.");
		showLogin();
		return;
	}        
}


function isUserameExists (userName){
    var size = allUsers.length;
    for(i=0; i < size; i++){

        if (allUsers[i].username == userName ) {
            return true;
        }
    }
    return false;
}