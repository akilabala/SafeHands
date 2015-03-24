/**
 * Created by abalasubramanian on 3/8/15.
 */

var app = app || {};

app.AppointmentView = Backbone.View.extend({

    tagName: 'li',

    template: _.template("<p class='patientName'> <%= firstName %> <%= lastName %></p>" +
    "<p class='appointmentDetails'><%= this.formatDate(new Date(appointmentDate)) %>" +
    "<%= appointmentTime %><%= this.getTimeSuffix(appointmentTime) %></p>"),

    render: function() {
        var json = this.model.toJSON();
        this.$el.html(this.template(json));
        return this;
    },

    getTimeSuffix: function(time) {
        return ":00 hrs";
    },

    formatDate: function(apptDate) {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var day = days[apptDate.getDay()];

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[apptDate.getMonth()];

        var date = apptDate.getDate();
        var year = apptDate.getFullYear();

        return day + ", " + month + " " + date + " " + year + " ";

    }
});