/**
 * Created by abalasubramanian on 3/8/15.
 */

var app = app || {};

$(document).ready(function() {

    $('#requestForm').submit(function () {
        if ($('#requestForm').valid()) {
            var firstName = $('#firstName').val();
            var lastName = $('#lastName').val();
            var phone = $('#phone').val();
            var emailId = $('#email').val();
            var speciality = $('#speciality').val();
            var appointmentDate = $('#date').val();
            var appointmentTime = $('#time').val();

            var appointment = new app.Appointment({
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                emailId: emailId,
                speciality: speciality,
                appointmentDate: appointmentDate,
                appointmentTime: appointmentTime
            });
            appointment.save(null, {
                success: function() {
                    alert("Thank you for contacting us. Your appointment has been scheduled successfully.");
                }
            });
        }
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

        var doctorsList = new app.DoctorList();
        doctorsList.on('add', function() {
            if (this.length > 0) {
                var doctors = this.filter(function (doctor) {
                    return doctor.get("username") == username;
                });

                if (doctors != undefined && doctors.length > 0) {
                    window.localStorage.setItem("doctorName", doctors[0].get("name"));
                    window.localStorage.setItem("speciality", doctors[0].get("speciality"));

                    $.post(
                        "/api/authenticate",
                        {
                            username: username,
                            password: password
                        },
                        function (data) {
                            var token = data.token;
                            if (token) {
                                window.localStorage.setItem("token", token);
                            }
                        }
                    );
                    window.open("../views/appointment.html", "_self");
                }
            }
        });
        doctorsList.fetch();
    });

    $('#logout').click(function() {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("doctorName");
        window.localStorage.removeItem("speciality");
    });
});
