/**
 * Created by abalasubramanian on 3/8/15.
 */

var app = app || {};

app.AppointmentView = Backbone.View.extend({

    tagName: 'li',

    template: _.template("<p><%= firstName %></p>"),

    render: function() {
        var json = this.model.toJSON();
        this.$el.html(this.template(json));
        return this;
    }
});