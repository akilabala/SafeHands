/**
 * Created by abalasubramanian on 3/15/15.
 */

var app = app || {};

app.DoctorList = Backbone.Collection.extend({

    model: app.Doctor,

    url: '/api/doctors'

});