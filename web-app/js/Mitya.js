$(document).ready(function() {




window.MityaView = Backbone.View.extend({
    initialize: function() {
        user.bind("change:firstName", this.loggedIn, this)
    },

    loggedIn: function() {
        console.log('mitya view');
    }
});
});