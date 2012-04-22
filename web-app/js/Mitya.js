$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };

    // FIXME Hack! Map is not displayed, just needed for google.maps.places.PlacesService
    // constructor


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
            var df1 = $.Deferred(), df2 = $.Deferred(), df3 = $.Deferred(),
                whenAll = $.when(df1, df2, df3), self = this;
            // FIXME change:id, which id?
            user.bind("change:id", function (argument) {
                df1.resolve();
            }, this)
            user.bind("change:longitude", function () {
                df2.resolve();
            }, this)
            user.bind("change:latitude", function () {
                df3.resolve();
            }, this)
            whenAll.done(function () {
                user.bind("change:longitude", function () {
                    self.processPlaces();
                }, this)
                self.processPlaces();
            });
        },

        processPlaces: function() {
            var addressToken, address = '', searchRequests = [], self = this;

            jQuery(this.el).empty();
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
                    && Common.getDistanceBetweenLatLng(
                        eventData.venue.latitude,
                        eventData.venue.longitude,
                        window.user.get('latitude'),
                        window.user.get('longitude')
                    ) < Common.RADIUS
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
                                    radius: Common.RADIUS,
                                    language:'en'
                                }, function (results, status) {
                                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                                        var view = new PlaceView();
                                        view.json = {

                                            place : results[0],
                                            friends : friendsOnEvent,
                                            eid: eventData.eid
                                        };
                                        $(self.el).append(view.render().el);
                                        Common.renderPanoramioPlugin(results[0].geometry.location.Za, results[0].geometry.location.$a, eventData.eid, Common.epsilon);
                                    };

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
