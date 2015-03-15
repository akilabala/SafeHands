/**
 * Created by abalasubramanian on 3/8/15.
 */

var app = app || {};

$(document).ready(function() {

    $('#requestForm').submit(function () {
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var phone = $('#phone').val();
        var emailId = $('#email').val();
        var specialty = $('#specialty').val();
        var appointmentDate = $('#date').val();
        var appointmentTime = $('#time').val();

        var appointment = new app.Appointment({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            emailId: emailId,
            specialty: specialty,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime
        });
        appointment.save();
    });

    $('#loginBtn').click(function(){
        var username = $.trim($('#username').val());
        var password = $('#password').val();
        if (username == "") {
            $('#errorLogin').html("Enter your username.");
            return false;
        } else if (password == "") {
            $('#errorLogin').html("Enter your password.");
            return false;
        }

        $.post(
            "/api/authenticate",
            {
                username: username,
                password: password
            },
            function(data) {
                var token = data.token;
                if (token) {
                    window.localStorage.setItem("token", token);
                }
            }
        );
        window.open("../views/appointment.html", "_self");
    });
});
