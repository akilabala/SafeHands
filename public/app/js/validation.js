/**
 * Created by abalasubramanian on 3/8/15.
 */

$(document).ready(function() {
    $('#requestForm').validate({
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            phone: {
                required: true,
                phoneUS: true
            },
            email: {
                required: true,
                email: true
            },
            date: {
                required: true
            },
            time: {
                required: true
            },
            specialty: {
                required: true
            }
        },
        messages: {
            firstName: {
                required: " Enter your first name."
            },
            lastName: {
                required: " Enter your last name."
            },
            phone: {
                required: " Enter your phone number.",
                phoneUS: " Phone numbers must be in this format: (999) 999-9999."
            },
            email: {
                required: " Enter your email address.",
                email: " Email addresses must be in this format: a@b.com."
            },
            specialty: {
                required: " Enter the specialty you are seeking."
            },
            date: {
                required: " Enter the date of your appointment."
            },
            time: {
                required: " Enter the time of your appointment."
            }
        },
        focusCleanup: true
    });
});
