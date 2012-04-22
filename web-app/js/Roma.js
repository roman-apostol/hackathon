$(document).ready(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g,
        evaluate : /\{!(.+?)!\}/g
    };

    window.Page = Backbone.RelationalModel.extend({
        defaults: {
            description: null,
            name: null,
            page_id: null,
            username: null
        }
    });

    window.FbUser = Backbone.RelationalModel.extend({
        defaults: {
            name: null
        }
    });

    window.PageList = Backbone.Collection.extend({
        model: Page
    });

    window.Coords = Backbone.RelationalModel.extend({
        defaults: {
            latitude: null,
            longitude: null
        }
    });

    window.Like = Backbone.RelationalModel.extend({
        defaults: {
            name: null
        }
    });

    window.LikeList = Backbone.Collection.extend({
        model: Like
    });

    window.LikeData = Backbone.RelationalModel.extend({
        relations: [{
            type: Backbone.HasOne,
            key: 'data',
            includeInJSON: true,
            relatedModel: 'Like',
            collectionType: 'LikeList'
        }]
    });

    window.Tag = Backbone.RelationalModel.extend({
        defaults: {
            name: null
        }
    });

    window.TagList = Backbone.Collection.extend({
        model: Tag
    });

    window.TagData = Backbone.RelationalModel.extend({
        relations: [{
            type: Backbone.HasMany,
            key: 'data',
            includeInJSON: true,
            relatedModel: 'Tag',
            collectionType: 'TagList'
        }]
    });

    window.Place = Backbone.RelationalModel.extend({
        defaults: {
            name: null
        },

        relations: [{
            type: Backbone.HasOne,
            key: 'location',
            includeInJSON: true,
            relatedModel: 'Coords'
        }]
    });

    window.CoordsList = Backbone.Collection.extend({
        model: Coords
    });

    window.Checkin = Backbone.RelationalModel.extend({
        defaults: {
            checkin_id: null,
            message: null,
            timestamp: null,
            created_time: null
        },
        relations: [{
            type: Backbone.HasOne,
            key: 'place',
            includeInJSON: true,
            relatedModel: 'Place'
        }, {
            type: Backbone.HasOne,
            key: 'from',
            includeInJSON: true,
            relatedModel: 'FbUser'
        }, {
            type: Backbone.HasOne,
            key: 'tags',
            includeInJSON: true,
            relatedModel: 'TagData'
        }, {
            type: Backbone.HasOne,
            key: 'likes',
            includeInJSON: true,
            relatedModel: 'LikeData'
        }]
    });

    window.CheckinList = Backbone.Collection.extend({
        model: Checkin
    });


    window.CheckinView = Backbone.View.extend({
        template: _.template($("#checkin-templ").html()),

        render: function() {
            $(this.el).html(this.template(this.json));
            return this;
        }
    });

    window.CheckinsColumn = Backbone.View.extend({
        el: $('#checkins'),
        checkins: null,
        pages: null,
        taggedUsers: null,
        checkinsRendered: 0,
        retrievedAll: false,
        numRetrieving: 0,
        numRetrieved: 0,
        retrieving: false,

        initialize: function() {
            user.bind("change:id", this.retrieveInfo, this);
            this.checkins = new CheckinList;
            this.pages = new PageList;
            this.taggedUsers = new UserList;
        },

        retrieveInfo: function() {
            var self = this;
            console.log("KKKKK");
            $(this.el).html("");
            FB.api ({
                method: 'fql.multiquery',
                queries: {
                    query1: "SELECT post_id, checkin_id, coords, tagged_uids, page_id, message, timestamp, page_id FROM checkin WHERE author_uid in (SELECT uid2 FROM friend WHERE uid1 = me()) and ("+
                    parseInt(window.user.get('latitude'))+"-coords.latitude) < 1 and (coords.latitude-"+parseInt(window.user.get('latitude'))+")<1 and ("+
                        parseInt(window.user.get('longitude'))+"-coords.longitude) < 1 and (coords.longitude-"+parseInt(window.user.get('longitude'))+")<1 ORDER BY timestamp desc",
                    query2: "SELECT page_id, name, username, description FROM page WHERE page_id in (SELECT page_id FROM #query1)",
                    query3: "SELECT uid, username, name, pic_small FROM user WHERE uid in (SELECT tagged_uids FROM #query1)",
                    query4: "SELECT name , pic_big, description, fan_count, website, checkins, location FROM page WHERE page_id IN (SELECT page_id FROM #query1)"
                }
            },  function(response) {

                console.log(response);
                //console.log(response[0].fql_result_set);
                self.checkins.reset(response[0].fql_result_set);
                self.pages.reset(response[1].fql_result_set);
                self.taggedUsers.reset(response[2].fql_result_set);
                self.pages.reset(response[3].fql_result_set);
                self.renderCheckins(10);
            });
        },

        renderCheckins: function(num) {
            this.checkinsRendered = 0;
            this.numRetrieving = num;
            var self = this;

            this.checkins.each(function(checkin) {
                if (!checkin.get('rendered') && self.checkinsRendered < num) {

                    self.checkinsRendered++;
                    checkin.set('rendered', true)

                    var index = checkin.get('post_id').indexOf('_');
                    var post_id = checkin.get('post_id').substr(index + 1, checkin.get('post_id').length);

                    FB.api(post_id, self.checkinRetrieved);
                }
            });

            if (this.checkinsRendered < num && this.checkins.length > 0) {
                this.retrievedAll = true;
            }
            this.checkinsRendered = 0;
        },

        checkinRetrieved: function(response) {
            checkinsView.numRetrieved += 1;
            if (checkinsView.numRetrieved == checkinsView.numRetrieving) {
                checkinsView.retrieving = false;
                checkinsView.numRetrieved = 0;
                checkinsView.numRetrieving = 0;
            }

            var view = new CheckinView;
            if (!response.message) {
                response.message = '';
            }
            if (!response.likes) {
                response.likes = {};
                response.likes.data = [];
            }

            if (!response.comments) {
                response.comments = {};
                response.comments.data = [];
            }

            if (!response.tags) {
                response.tags = {};
                response.tags.data = [];
            }

            view.json = response;
            $(checkinsView.el).append(view.render().el);
        },

        bottomReached: function() {
            if  (!(this.retrieving) && !(this.retrievedAll)
                && ($(window).scrollTop() > $(document).height() - $(window).height() - 100)) {
                this.retrieving = true;

                this.renderCheckins(10);
            }
        }
    });
});
