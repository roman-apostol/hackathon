$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };

    // FIXME Hack! Map is not displayed, just needed for google.maps.places.PlacesService
    // constructor
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: pyrmont,
        zoom: 15
    });

    var placesServices = new google.maps.places.PlacesService(map);

    window.PlaceView = Backbone.View.extend({
        template: _.template($("#place-templ").html()),

        render: function() {
            $(this.el).html(this.template(this.json));
            return this;
        }
    });

    window.MityaView = Backbone.View.extend({
        el: $('#places'),
        initialize: function() {
            // FIXME change:id, which id?
            user.bind("change:id", this.loggedIn, this)
        },

        loggedIn: function() {
            var addressToken, address = '', searchRequests = [], self = this;
            jQuery(document).bind('searchRequestsDequeue', function () {
                setTimeout(searchRequests.pop(), 100);
            });

            FB.api ({
                method: 'fql.multiquery',
                queries: {
                    query1: 'SELECT uid2 FROM friend WHERE uid1 = me()',
                    query2: "SELECT eid, uid from event_member WHERE uid IN (SELECT uid2 FROM #query1) AND rsvp_status in ('attending', 'maybe') AND start_time > 0",
                    query3: 'SELECT eid, name, venue, location FROM event WHERE eid IN ( SELECT eid FROM #query2) ORDER BY start_time'
                }
            },  function(response) {
                var locationProcessed = [];
                response[2].fql_result_set.forEach(function(eventData) {
                    var friendsOnEvent = [];
                    if (eventData.venue.longitude
                    && eventData.venue.latitude
                    && eventData.location
                    && !locationProcessed.hasOwnProperty(eventData.location.trim())) {
                        locationProcessed[eventData.location.trim()]  = true;

                        response[1].fql_result_set.filter(function (data) {
                            if (data.eid === eventData.eid)  {
                                friendsOnEvent.push(data.uid);
                            }
                        });

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
                                        var view = new PlaceView();
                                        view.json = {
                                            place : results[0],
                                            friends : friendsOnEvent
                                        }
                                        $(self.el).append(view.render().el);
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
