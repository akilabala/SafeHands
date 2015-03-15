/**
 * Created by abalasubramanian on 3/10/15.
 */
var app = app || {};

app.router = new (Backbone.Router.extend({

    routes: {
      "":"index"
    },

    initialize: function() {
        this.collection = new app.AppointmentList();
        var appointmentListView = new app.AppointmentListView({collection: this.collection});
        $('#appointments').append(appointmentListView.render().el);
    },

    index: function() {
        this.collection.fetch();
    },

    start: function() {
        Backbone.history.start({pushState: true});
    }

}));
