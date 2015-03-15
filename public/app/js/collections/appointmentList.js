/**
 * Created by abalasubramanian on 3/8/15.
 */

var app = app || {};

app.AppointmentList = Backbone.Collection.extend({

    model: app.Appointment,

    url: '/api/appointments'

});