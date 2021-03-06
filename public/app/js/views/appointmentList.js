/**
 * Created by abalasubramanian on 3/8/15.
 */

var app = app || {};

app.AppointmentListView = Backbone.View.extend({

    tagName: 'ul',

    initialize: function() {
        this.collection.on('add', this.addOne, this);
    },

    render: function() {
        this.collection.forEach(this.addOne, this);
        return this;
    },

    addOne: function(appointment) {
        console.log(appointment);
        if (this.doesSpecialityMatch(appointment)) {
            var appointmentView = new app.AppointmentView({model: appointment});
            appointmentView.render();
            this.$el.append(appointmentView.el);
        }
    },

    doesSpecialityMatch: function(appointment) {
        return appointment.get('speciality') == window.localStorage.getItem("speciality");
    }
});