// $.validator.setDefaults({
//     submitHandler: function() {
//         alert("submitted!");
//     }
// });

// $().ready(function() {

//     var users = [];
//     users.push({ username: "p", password: "p" }); //default one.

//     // validate signup form on submit
//     $("signupForm").validate({
//         rules: {
//             firstname: {
//                 required: true,
//                 // digits: false
//             },
//             lastname: {
//                 required: true,
//                 //  digits: false
//             },
//             username: {
//                 required: true,
//             },

//             password: {
//                 required: true,
//                 minlength: 6,
//                 // containNumbers: {
//                 //     text: "Your input should contain at least 1 digit",
//                 //     minLength: 1,
//                 //     regex: new RegExp('[^0-9]', 'g')
//                 // },
//                 // containLetter: {
//                 //     text: "Your input should contain at least one character",
//                 //     minLength: 1,
//                 //     regex: new RegExp('[^a-zA-Z]', 'g')
//                 // },
//             },

//             email: {
//                 required: true,
//                 email: true,
//                 // text: "Please enter a valid email address",
//             },

//         },
//         messages: {
//             firstname: {
//                 required: "Please enter a username",
//                 // digits: "Your first name must not contain digits",
//             },
//             lastname: {
//                 required: "Please enter a username",
//                 //    digits: "Your last name must not contain digits",
//             },
//             username: {
//                 required: "Please enter a username"
//             },
//             password: {
//                 required: "Please provide a password",
//                 minlength: "Your password must be at least 6 characters long",
//                 //    containNumbers: "Your input should contain at least 1 digit"
//             },
//             // confirm_password: {
//             // 	required: "Please provide a password",
//             // 	minlength: "Your password must be at least 5 characters long",
//             // 	equalTo: "Please enter the same password as above"
//             // },
//         }
//     });

//     // function saveUserSignUpForm() {
//     //     //var txtbox1=document.getElementById("txtbox1");
//     //     //sessionStorage.setItem("name",txtbox1.value);



//     //     var person = { username: getElementById("username"), password: getElementById("password"), fullname: getElementById("fullname") };
//     //     users.push(person);
//     // }

// });



// // $(document).ready(function() {
// //     $("#register").click(function() {
// //         var name = $("#name").val();
// //         var email = $("#email").val();
// //         var password = $("#password").val();
// //         var cpassword = $("#cpassword").val();
// //         if (name == '' || email == '' || password == '' || cpassword == '') {
// //             alert("Please fill all fields...!!!!!!");
// //         } else if ((password.length) < 8) {
// //             alert("Password should atleast 8 character in length...!!!!!!");
// //         } else if (!(password).match(cpassword)) {
// //             alert("Your passwords don't match. Try again?");
// //         } else {
// //             $.post("register.php", {
// //                 name1: name,
// //                 email1: email,
// //                 password1: password
// //             }, function(data) {
// //                 if (data == 'You have Successfully Registered.....') {
// //                     $("form")[0].reset();
// //                 }
// //                 alert(data);
// //             });
// //         }
// //     });
// // });





// // // Wait for the DOM to be ready
// // $(function() {
// //     // Initialize form validation on the registration form.
// //     // It has the name attribute "registration"
// //     $("form[name='registration']").validate({
// //         // Specify validation rules
// //         rules: {
// //             // The key name on the left side is the name attribute
// //             // of an input field. Validation rules are defined
// //             // on the right side
// //             firstname: "required",
// //             lastname: "required",
// //             email: {
// //                 required: true,
// //                 // Specify that email should be validated
// //                 // by the built-in "email" rule
// //                 email: true
// //             },
// //             password: {
// //                 required: true,
// //                 minlength: 5
// //             }
// //         },
// //         // Specify validation error messages
// //         messages: {
// //             firstname: "Please enter your firstname",
// //             lastname: "Please enter your lastname",
// //             password: {
// //                 required: "Please provide a password",
// //                 minlength: "Your password must be at least 5 characters long"
// //             },
// //             email: "Please enter a valid email address"
// //         },
// //         // Make sure the form is submitted to the destination defined
// //         // in the "action" attribute of the form when valid
// //         submitHandler: function(form) {
// //             form.submit();
// //         }
// //     });
// // });


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