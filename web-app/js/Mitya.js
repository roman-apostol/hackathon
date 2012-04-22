$(document).ready(function() {
    // FIXME Hack! Map is not displayed, just needed for google.maps.places.PlacesService
    // constructor
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: pyrmont,
        zoom: 15
    });

    var placesServices = new google.maps.places.PlacesService(map);

/*    window.PlaceView = Backbone.View.extend({
        template: _.template($("#place-templ").html()),

        render: function() {
            $(this.el).html(this.template(this.model.toJSONFull()));
            return this;
        }
    });*/

    window.MityaView = Backbone.View.extend({
        initialize: function() {
            // FIXME change:id, which id?
            user.bind("change:id", this.loggedIn, this)
        },

        loggedIn: function() {
            var addressToken, address = '', searchRequests = [];
            jQuery(document).bind('searchRequestsDequeue', function () {
                setTimeout(searchRequests.pop(), 400);
            });

            FB.api ({
                method: 'fql.query',
                query: "SELECT name, venue, location FROM event WHERE eid in (SELECT eid from event_member WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) AND rsvp_status = 'attending' AND start_time > 0 ) ORDER BY start_time LIMIT 100"
            },  function(response) {
                response.forEach(function(eventData) {
                    if (eventData.venue.longitude && eventData.venue.latitude && eventData.location) {
                        searchRequests.push(function () {
                            placesServices.search(
                                {
                                    location: new google.maps.LatLng(
                                        eventData.venue.latitude,
                                        eventData.venue.longitude
                                    ),
                                    rankby: 'distance',
                                    radius: 50000,
                                    keyword: eventData.location
                                }, function (results, status) {
                                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                                        console.log(results[0]);
                                    }
                                    jQuery(document).trigger('searchRequestsDequeue');
                                },
                                function () {
                                    jQuery(document).trigger('searchRequestsDequeue');
                                }
                            );
                        });
                    }
                });
                jQuery(document).trigger('searchRequestsDequeue');
            });
        }
    });
});
