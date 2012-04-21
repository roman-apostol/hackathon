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
            $(this.el).html(this.template(this.model.toJSONFull()));
            return this;
        }
    });

    window.RomaView = Backbone.View.extend({
        el: $('#checkins'),
        checkins: null,
        pages: null,
        taggedUsers: null,
        checkinsRendered: 0,

        initialize: function() {
            user.bind("change:id", this.retrieveInfo, this);
            this.checkins = new CheckinList;
            this.pages = new PageList;
            this.taggedUsers = new UserList;

            this.checkins.bind('reset', this.checkinsReset, this);
        },

        retrieveInfo: function() {
            var self = this;
            FB.api ({
                method: 'fql.multiquery',
                queries: {
                    query1: 'SELECT post_id, checkin_id, coords, tagged_uids, page_id, message, timestamp, page_id FROM checkin WHERE author_uid in (SELECT uid2 FROM friend WHERE uid1 = me())',
                    query2: 'SELECT page_id, name, username, description FROM page WHERE page_id in (SELECT page_id FROM #query1)',
                    query3: 'SELECT uid, username, name, pic_small FROM user WHERE uid in (SELECT tagged_uids FROM #query1)',
                    query4: 'SELECT name , pic_big, description, fan_count, website, checkins, location FROM page WHERE page_id IN (SELECT page_id FROM #query1)'
                }
            },  function(response) {
                self.checkins.reset(response[0].fql_result_set);
                self.pages.reset(response[1].fql_result_set);
                self.taggedUsers.reset(response[2].fql_result_set);
                self.pages.reset(response[3].fql_result_set);
                self.renderCheckins(10);
            });
        },

        renderCheckins: function(num) {
            this.checkinsRendered = 0;
            var self = this;

            this.checkins.each(function(checkin){
                if (!checkin.get('rendered') && self.checkinsRendered < num) {
                    self.checkinsRendered++;
                    checkin.set('rendered', true)

                    var index = checkin.get('post_id').indexOf('_');
                    var post_id = checkin.get('post_id').substr(index + 1, checkin.get('post_id').length);

                    FB.api(post_id, self.checkinRetrieved);
                }
            });
            this.checkinsRendered = 0;
        },

        checkinRetrieved: function(response) {
            var checkin = new Checkin(response);
           // console.log(checkin);
            var view = new CheckinView({model: checkin});

        },

        checkinsReset: function() {
            var self = this;
            this.checkins.each(function(val) {
                var view = new CheckinView({model: val});
                $(self.el).append(view.render().el);
            });
        }
    });
});