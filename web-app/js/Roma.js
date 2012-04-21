$(document).ready(function() {



window.RomaView = Backbone.View.extend({
    initialize: function() {
        user.bind("change:firstName", this.loggedIn, this)
    },

    loggedIn: function() {
        console.log('roma view');
    }
});
});