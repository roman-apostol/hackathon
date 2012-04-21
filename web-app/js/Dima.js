$(document).ready(function() {


window.DimaView = Backbone.View.extend({
    initialize: function() {
        user.bind("change:firstName", this.loggedIn, this)
    },

    loggedIn: function() {
        console.log('dima view');
    }
});
});