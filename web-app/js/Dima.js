$(document).ready(function() {


window.DimaView = Backbone.View.extend({
    initialize: function() {
        user.bind("change:firstName", this.loggedIn, this)
    },

    loggedIn: function() {
        $("#loader").show();
        FB.api(
            {
                method: 'fql.query',
                query: "SELECT id, page_id FROM location_post WHERE author_uid IN (SELECT uid2 FROM friend WHERE uid1=me()) and  timestamp > 1331143200"
            },
            function(response) {
                //alert('Your name is ' + response[0].name);
                console.log(response[0]);
                $("#loader").hide();
            }
        );
        console.log('dima view');
    }
});
});