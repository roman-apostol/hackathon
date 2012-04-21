$(document).ready(function() {



window.RomaView = Backbone.View.extend({
    el: $('#test'),
    template: _.template($("#checkin-templ").html()),

    initialize: function() {
        user.bind("change:id", this.retrieveInfo, this)
    },

    retrieveInfo: function() {
        FB.api('/me/friends', {fields: 'id, checkins'}, function(response) {
            console.log("got some info");
            console.log(response);
        });
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSONFull()));
        return this;
    }
});
});